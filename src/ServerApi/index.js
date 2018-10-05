const instagramApiUrl = 'https://api.instagram.com/v1/users';
const access_token = '1832468801.ba4c844.6ff369f292ce4324ae4f26c54ba3dbf5';
var Promise = require('promise');

const UserSearchAPI = function (pname) {
    const url = instagramApiUrl + '/search?q=' + pname + '&access_token=' + access_token;
    
    return fetch(url, {
        method : 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then( resp => resp.json() );
}

const findMatchOne = function( users, pname) {
    for(let i = 0; i < users.length; i ++ ){
        if(users[i].username === pname){
            return users[i].id;
        }
    }
    return null;
}

//Get Profile from ID
const GetProfile = function ( userid ){
    const profileUrl = instagramApiUrl + '/' + userid + '/?access_token=' + access_token;
    return fetch(profileUrl, {
            method : 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then( resp => resp.json() )
        .then(resp1 => {
            if(resp1.meta.code !== 200){
                return null;
            }
            else{
                return resp1;
            }
        });
}

//Get Profile from List
const GetMatchedProfile = function ( users, index ) {
    if (users.length <= index) {
        return new Promise(null, resp => null);
    }
    else {
        return GetProfile( users[index].id )
                .then(resp => {
                    if(resp === null) {
                        return GetMatchedProfile ( users, index + 1 );
                    }
                    else {
                        return resp;
                    }
                });
    }
}

const GetFullProfileAPI = function( users, pname ) {
    var matchedID = findMatchOne(users, pname);

    if(matchedID !== null) {
        return GetProfile( matchedID ).then(resp => {
            if( resp === null ){
                return GetMatchedProfile( users, 0 );
            }
            else{
                return resp;
            }
        });
    }
    else
    {
        return GetMatchedProfile( users, 0);
    }
}

const GetProfileApi = function ( pname ) {
    return UserSearchAPI(pname).then(resp => {
        if(resp.data.length !== 0)
        {
            return GetFullProfileAPI( resp.data, pname );
        }
        else
            return null;
    });
}

const GetRecent = function ( user_id ) {
    const url = instagramApiUrl + '/' + user_id + '/media/recent/?access_token=' + access_token;

    return fetch( url, {
        method : 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(resp => resp.json());
}

const GetRecentImageApi = function ( pname ) {
    return GetProfileApi( pname ).then(resp => {
        if(resp == null){
            return null;
        }
        else {
            return GetRecent( resp.data.id ).then(resp1 => {
                var images = [];
    
                for(let i = 0; i < resp1.data.length ; i ++){
                    if(resp1.data[i].type === 'image'){
                        images.push(resp1.data[i]);
                    }
                }
    
                for(let i = 0; i < images.length ;i ++){
                    images[i].id = i;
                }
                return images;
            });
        }
    });
}

const GetRecentVideoApi = function ( pname ) {
    return GetProfileApi( pname ).then(resp => {
        if(resp == null){
            return null;
        }
        else {
            return GetRecent( resp.data.id ).then(resp1 => {
                var videos = [];
                
                for(let i = 0; i < resp1.data.length ; i ++){
                    if(resp1.data[i].type === 'video'){
                        videos.push(resp1.data[i]);
                    }
                }

                for(let i = 0; i < videos.length ;i ++){
                    videos[i].id = i;
                }
                
                return videos;
            });
        }
    });
}

export { GetProfileApi, GetRecentImageApi, GetRecentVideoApi};