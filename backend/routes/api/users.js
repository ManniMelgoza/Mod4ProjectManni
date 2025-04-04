// backend/routes/api/users.js
const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
//   // THIS WILL BE USED IN ANY ROUTER FILE THAT NEED PROTECTION FROM USERS THAT ARE NOT YET LOGGED IN (POST, PATH, DELETE)
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');


const router = express.Router();

// check for email format and check username with char 8 char long, check passwoord
//
const validateSignup = [
    check('firstName')
      .exists({ checkFalsy: true })
      .withMessage('Provide a valid first name'),
    check('lastName')
      .exists({checkFalsy: true})
      .withMessage("Provide a valid last name"),
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];

// sign up route
router.post(
  // '',
  '/',
    validateSignup,
    async (req, res) => {
      const { email, password, username, firstName, lastName } = req.body;
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({ email, username, hashedPassword, firstName, lastName });

      const safeUser = {
        id: user.id,
        // is firstName and lastName needed??
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      };

    //   creating the new user a JWT
      await setTokenCookie(res, safeUser);

      return res.json({
        user: safeUser
      });
    }
  );

module.exports = router;
