export default class Likes {
    constructor(){
        this.likes = [];
    }
    addLike(id, title, author, img){
        const like = { id, title, author, img};
        this.likes.push(like);

        //persist data in localStorage
        this.persistData();
        return like
    }

    
    deleteLike(id){
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);

        //persist data in localStorage
        this.persistData();


    }

    isLiked(id){
        return this.likes.findIndex(el => el.id ===id) !== -1;
    }

    getNumLikes(){
        return this.likes.length;
    }

    persistData(){
        //it only accepts strings
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage(){
        //convert to previous data structure
        const storage = JSON.parse(localStorage.getItem('likes'));

        // restore likes from local storage (previous sessions)
        if (storage) this.likes = storage;

    }
}