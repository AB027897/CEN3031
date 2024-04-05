class Post {
    constructor(uuid, type, token, title, previewCaption, body) {
        this.uuid = uuid;
        this.charity_type = type;
        this.token = token;
        this.title = title;
        this.preview_caption = previewCaption;
        this.body = body;
    }
}
export default Post;