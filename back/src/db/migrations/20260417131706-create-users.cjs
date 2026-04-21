'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Crear ENUM si no existe
    await queryInterface.sequelize.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_type WHERE typname = 'enum_users_type'
        ) THEN
          CREATE TYPE "enum_users_type" AS ENUM ('owner', 'delivery');
        END IF;
      END
      $$;
    `);

    // 2. Crear extensión para UUID (IMPORTANTE)
    await queryInterface.sequelize.query(`
      CREATE EXTENSION IF NOT EXISTS "pgcrypto";
    `);

    // 3. Crear tabla
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'), // 👈 CLAVE
        primaryKey: true,
        allowNull: false,
      },

      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      type: {
        type: 'enum_users_type',
        allowNull: false,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },

      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');

    await queryInterface.sequelize.query(`
      DROP TYPE IF EXISTS "enum_users_type" CASCADE;
    `);
  },
};