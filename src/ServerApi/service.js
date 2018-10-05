const serverUrl = 'http://cheapbulksocial.com/api.php';

const InstagramLikeID = 2;
const InstagramFollowerID = 86;
const InstagramViewID = 79;
const InstagramCommentID = 41;

const FacebookLikeID = 18;
const YoutubeViewID = 15;
const YoutubeLikeID = 33;
const YoutubeSubID = 27;

const GetApiKey = function ( ) {
    const Url = 'https://sleepy-beach-19067.herokuapp.com/get_apikey';

    return fetch(Url, {
        method : 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then( resp => resp.json() );
}

const InstagramLike = function (eachCount, links, ApiKey ){
    const url = serverUrl + '?key=' + ApiKey + '&o_type=' + InstagramLikeID + '&c_url=' + links[0] + '&o_qty=' + eachCount;
        
    return fetch(url, {
            method : 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then( resp => {
                for(let i = 1 ; i < links.length ;i ++){
                    const url_rest = serverUrl + '?key=' + ApiKey + '&o_type=' + InstagramLikeID + '&c_url=' + links[i] + '&o_qty=' + eachCount;
                    
                    fetch(url_rest, {
                            method : 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                }
                return resp;
            } 
        );
}

const InstagramFollower = function ( count, link, ApiKey ) {
    const url = serverUrl + '?key=' + ApiKey + '&o_type=' + InstagramFollowerID + '&c_url=' + link + '&o_qty=' + count;

    return fetch(url, {
        method : 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then( resp => resp.json() );
}

const InstagramView = function ( eachCount, links, ApiKey ) {
    const url = serverUrl + '?key=' + ApiKey + '&o_type=' + InstagramViewID + '&c_url=' + links[0] + '&o_qty=' + eachCount;
    
    return fetch(url, {
            method : 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then( resp => {
                for(let i = 1 ; i < links.length ;i ++){
                    const url_rest = serverUrl + '?key=' + ApiKey + '&o_type=' + InstagramViewID + '&c_url=' + links[i] + '&o_qty=' + eachCount;
                    
                    fetch(url_rest, {
                            method : 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                }
                console.log(resp.json());
                return resp;
            } 
        );
}

const InstagramComment = function ( count, link, ApiKey ) {
    const url = serverUrl + '?key=' + ApiKey + '&o_type=' + InstagramCommentID + '&c_url=' + link + '&o_qty=' + count;
    
    return fetch(url, {
        method : 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then( resp => resp.json() );
}

const FacebookLike = function ( count, link, ApiKey ) {
    const url = serverUrl + '?key=' + ApiKey + '&o_type=' + FacebookLikeID + '&c_url=' + link + '&o_qty=' + count;
    
    return fetch(url, {
        method : 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then( resp => resp.json() );
}

const YoutubeView = function ( count, link, ApiKey ) {
    const url = serverUrl + '?key=' + ApiKey + '&o_type=' + YoutubeViewID + '&c_url=' + link + '&o_qty=' + count;
    
    return fetch(url, {
        method : 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then( resp => resp.json() );
}

const YoutubeLike = function ( count, link, ApiKey ) {
    const url = serverUrl + '?key=' + ApiKey + '&o_type=' + YoutubeLikeID + '&c_url=' + link + '&o_qty=' + count;
    
    return fetch(url, {
        method : 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then( resp => resp.json() );
}

const YoutubeSub = function ( count, link, ApiKey ) {
    const url = serverUrl + '?key=' + ApiKey + '&o_type=' + YoutubeSubID + '&c_url=' + link + '&o_qty=' + count;
    
    return fetch(url, {
        method : 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then( resp => resp.json() );
}

const Service = function ( category, subcategory , count, link ) {
    return GetApiKey().then(resp => {
        const APIKey = resp.key;

        if ( category === 'facebook') {
            return FacebookLike(count, link, APIKey);
        }
        if ( category === 'instagram') {
            if(subcategory === 'followers') {
                return InstagramFollower(count, link, APIKey);
            }
            if(subcategory === 'likes') {
                return InstagramLike(count, link, APIKey);   
            }
            if(subcategory === 'views') {
                return InstagramView(count, link, APIKey);
            }
            if(subcategory === 'comments'){
                return InstagramComment(count, link, APIKey);
            }
        }
        if( category === 'youtube' ) {
            if(subcategory === 'views') {
                return YoutubeView(count, link, APIKey);
            }
            if(subcategory === 'likes') {
                return YoutubeLike(count, link, APIKey);
            }
            if(subcategory === 'subscribers') {
                return YoutubeSub(count, link, APIKey);
            }
        }
    });
}
export { Service };