/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
  
  // '/': {
  //   view: 'pages/homepage'
  // },

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝

  // v1
  'POST /api/v1/signin'  : 'LoginController.login',
  'POST /api/v1/signout' : 'LoginController.logout',
  'POST /api/v1/signup'   : 'SignupController.signup',

  // payment
  'POST /api/v1/payment/billingKey' : 'PaymentController.setBillingKey',

  // token refresh
  'POST /api/v1/token': 'TokenController.refreshToken',

  'GET /api/v1/oAuthCallback/:provider' : 'OAuthCallbackController.oAuth',

  'GET /api/v1/boards/:category'       : 'BoardController.getArticleList',
  'GET /api/v1/boards/:category/:id'   : 'BoardController.getArticle',

  'GET /api/v1/boards/:category/:boardId/replies'                  : 'BoardReplyController.getReplyList',
  'PUT /api/v1/boards/:category/:boardId/replies/:replyId'         : 'BoardReplyController.updateReply',
  'DELETE /api/v1/boards/:category/:boardId/replies/:replyId'      : 'BoardReplyController.deleteReply',
  'PUT /api/v1/boards/:category/:boardId/replies/:replyId/like'    : 'BoardReplyController.likeReply',
  'PUT /api/v1/boards/:category/:boardId/replies/:replyId/dislike' : 'BoardReplyController.dislikeReply',

  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
