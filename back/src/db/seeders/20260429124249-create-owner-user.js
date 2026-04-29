'use strict';

import bcrypt from'bcrypt';

export default {
  async up(queryInterface) {
    const hashedPassword = await bcrypt.hash(
      process.env.OWNER_PASSWORD,
      10
    );

    await queryInterface.bulkInsert('Users', [
      {
        id: crypto.randomUUID(),

        firstName: process.env.OWNER_FIRST_NAME,

        lastName: process.env.OWNER_LAST_NAME,

        email: process.env.OWNER_EMAIL,

        password: hashedPassword,

        type: 'owner',

        createdAt: new Date(),

        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', {
      email: process.env.OWNER_EMAIL,
    });
  },
};