    
    var baseURL = 'http://ajax.frontend.itheima.net'
    $.ajaxPrefilter(function(option){
        option.url = baseURL + option.url
    })