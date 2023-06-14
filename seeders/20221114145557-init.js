'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
    */
    await queryInterface.bulkInsert('Users', [{
      email: 'jennie@blackpink.com',
      password: bcrypt.hashSync('jennie'),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    const players = [
      {
        "name": "Chiharu Shida",
        "rank": 2,
        "nationality": "Japan",
        "imageUrl": "https://res.cloudinary.com/bwf/t_96_player_profile/v1635908674/assets/players/thumbnail/68282"
      },
      {
        "name": "Viktor Axelsen",
        "rank": 1,
        "nationality": "Denmark",
        "imageUrl": "https://res.cloudinary.com/bwf/t_96_player_profile/v1627947839/assets/players/thumbnail/25831"
      },
      {
        "name": "Chae Yu Jung",
        "rank": 7,
        "nationality": "Korea",
        "imageUrl": "https://res.cloudinary.com/bwf/t_96_player_profile/v1634022922/assets/players/thumbnail/93074"
      },
      {
        "name": "Chou Tien Chen",
        "rank": 5,
        "nationality": "China Taipei",
        "imageUrl": "https://res.cloudinary.com/bwf/t_96_player_profile/v1658715713/assets/players/thumbnail/34810"
      },
      {
        "name": "Huang Ya Qiong",
        "rank": 1,
        "nationality": "China",
        "imageUrl": "https://res.cloudinary.com/bwf/t_96_player_profile/v1627952652/assets/players/thumbnail/63168"
      }
    ].map(p => {
      return {
        ...p,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    await queryInterface.bulkInsert('Players', players, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {})
    await queryInterface.bulkDelete('Players', null, {})
  }
};
