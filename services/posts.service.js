const { Post, Review } = require("../models");
const postRepository = require("../repositories/posts.repository");
const { Keyword } = require("../models");
const { Roomtitle } = require("../models");
const { Roomcharge } = require("../models");
const { Roomimage } = require("../models");

class PostService {
  postRepository = new postRepository();

  getAllPosts = async () => {
    const posts = await this.postRepository.getAllPosts();

    return Promise.all(
      posts.map(async (post) => {
        let arr_title = [];
        let arr_charge = [];
        let arr_image = [];
        let arr_keyword = [];
        let arr_review = [];
        let arr_rating = [];
        const keyword = await Keyword.findAll({
          where: { postId: post.postId },
        });
        for (let i = 0; i < keyword.length; i++) {
          arr_keyword.push(keyword[i].keyword);
        }
        /////
        const roomtitle = await Roomtitle.findAll({
          where: { postId: post.postId },
        });
        for (let i = 0; i < roomtitle.length; i++) {
          arr_title.push(roomtitle[i].title);
        }
        /////
        const roomcharge = await Roomcharge.findAll({
          where: { postId: post.postId },
        });
        for (let i = 0; i < roomcharge.length; i++) {
          arr_charge.push(roomcharge[i].charge);
        }
        const roomimage = await Roomimage.findAll({
          where: { postId: post.postId },
        });
        for (let i = 0; i < roomimage.length; i++) {
          arr_image.push(roomimage[i].image);
        }
        const review = await Post.findAll({
          where: { postId: post.postId },
          include: [{ model: Review }],
        });
        console.log("리뷰!", review.Reviews);
        for (let i = 0; i < review.length; i++) {
          arr_review.push(review[i].comment);
        }
        for (let i = 0; i < review.length; i++) {
          arr_rating.push(review[i].rating);
        }
        const getPost = await this.postRepository.getPost(post.postId);
        return {
          getPost,
        };
      })
    );
  };
  getPost = async (postId) => {
    const post = await this.postRepository.getPost(postId);

    return post;
  };
  createPost = async (
    placename,
    category,
    content,
    charge,
    location,
    images,
    nickname,
    userId,
    message
  ) => {
    const post = await this.postRepository.createPost(
      placename,
      category,
      content,
      charge,
      location,
      images,
      nickname,
      userId,
      message
    );
    return post;
  };
  updatePost = async (
    postId,
    placename,
    category,
    charge,
    content,
    images,
    location,
    message
  ) => {
    const post = await this.postRepository.updatePost(
      postId,
      placename,
      postId,
      category,
      charge,
      content,
      images,
      location,
      message
    );
    return post;
  };
  deletePost = async (postId) => {
    const post = await this.postRepository.deletePost(postId);
    return post;
  };
  searchPost = async (arr_keyword) => {
    const post = await this.postRepository.searchPost(arr_keyword);
    let postarray = [];
    for (let i = 0; i < post.length; i++) {
      let searchpost = await this.postRepository.getPost(post[i]);
      postarray.push(searchpost);
    }
    return postarray;
  };
}
module.exports = PostService;
