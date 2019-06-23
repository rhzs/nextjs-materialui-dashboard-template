const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy


const { noticeError } = require('../../lib/log')
const rp = require('request-promise-native')

passport.serializeUser(function(user, done) {
  console.log('call user serializer', user)
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use('local-login', new LocalStrategy({
    usernameField: 'phone_number',
    passwordField: 'pin',
    passReqToCallback: true
  },
  async function(req, mobileno, pin, done) {
    await 1

    const user = { id: 1, permission: {}}

    return done(null, user)
    // try {
    //   const { body: user } = await rp({
    //     method: 'POST',
    //     url: `${url_backend}/_internal_/api/login-with-pin`,
    //     body: {
    //       mobileno,
    //       pin,
    //       charge: req.session.paymentToken
    //     },
    //     json: true,
    //     timeout: 5000,
    //     resolveWithFullResponse: true
    //   })
    //   if (!user) {
    //     noticeError(new Error('undefined response from passport "local-login" strategy'))
    //     return done(null, false, { message: 'Silahkan coba kembali, server kami sedang sibuk'})
    //   }

    //   if (user && user.attempt && user.attempt > 0 ){
    //     //if wrong 3 times
    //     if(user.attempt > 3) {
    //       noticeError(new Error('wrong pin 3 times'))
    //       return done(null, false, { message: 'wrong_3times'})
    //     }

    //     noticeError(new Error('attempt to login wrong no hp or wrong pin'))
    //     return done(null, false, { message: 'No HP atau PIN salah'})
    //   }

    //   user.username = mobileno
    //   return done(null, user)
    // } catch(err) {
    //   noticeError(err)

    //   // 4447
    //   if (err.error.error.code == errUserIsLocked) {
    //     return done(null, false, { message: 'wrong_3times'})
    //   }
    //   else if (err.error.error.msg.toLowerCase() === 'invalid credentials' 
    //       || err.error.error.msg.toLowerCase() === 'missing credentials') {

    //     return done(null, false, { message: 'Nomor atau sandi yang anda masukkan tidak cocok'})
    //   } 
    //   else if (err.error.error.code == errUserDoesNotHaveFacilities) {
    //     return done(null, false, { message: err.error.error.msg})
    //   }
    //   else if (err.error.error.code == errCreditLimitIsBlocked) {
    //     return done(null, false, { message: err.error.error.msg})
    //   }
    //   else if (err.error.error.code == errNotEnoughCreditLimit) {
    //     return req.res.redirect('/payment-failed?msg=not_enough_limit');
    //   }
    //   else {
    //     return done(null, false, { message: 'Silahkan coba kembali, server kami sedang sibuk.'})
    //   }
    // }
  }
));

module.exports = passport
