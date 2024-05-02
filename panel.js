chrome.devtools.network.onRequestFinished.addListener((req) => {
  const url = req.request.url;
  const tweetDetail = new RegExp('TweetDetail');
  const userMedia = new RegExp('UserMedia');

  function findKeyAndValue(obj, targetKey, infos) {
    for (let key in obj) {
      if (key === targetKey) {
        infos.push(obj[key]);
        return;
      }
      if (typeof obj[key] === 'object') {
        findKeyAndValue(obj[key], targetKey, infos);
      }
    }
  }

  if (tweetDetail.test(url)) {
    req.getContent((content, encoding) => {
      const json = JSON.parse(content);
      const infos = [];
      findKeyAndValue(json, 'video_info', infos);

      url_list = [];
      infos.forEach((item) => {
        const variatns = item.variants;
        var video_url = '';
        var highest_bitrate = 0;
        variatns.forEach((variant) => {
          if (variant.bitrate) {
            if (variant.bitrate > highest_bitrate) {
              highest_bitrate = variant.bitrate;
              video_url = variant.url;
            }
          }
        })
        url_list.push(video_url);
      })
      
      const new_url_list = Array.from(new Set(url_list));
      const table = document.getElementById('videoTable');

      console.log(new_url_list);
      new_url_list.forEach((item) => {
        const row = table.insertRow(-1);
        const cell1 = row.insertCell(-1);
        const cell2 = row.insertCell(-1);
        const url = encodeURI(item);
        cell1.innerHTML = `<video controls width="100%"><source src ="${decodeURI(url)}" type="video/mp4"></video>`;
        cell2.innerHTML = `<a href="${item}" target="_blank">${item}</a>`;
      })
    });
  }

  if (userMedia.test(url)) {
    req.getContent((content, encoding) => {
      const json = JSON.parse(content);
      const infos = [];
      findKeyAndValue(json, 'video_info', infos);

      url_list = [];
      infos.forEach((item) => {
        const variatns = item.variants;
        var video_url = '';
        var highest_bitrate = 0;
        variatns.forEach((variant) => {
          if (variant.bitrate) {
            if (variant.bitrate > highest_bitrate) {
              highest_bitrate = variant.bitrate;
              video_url = variant.url;
            }
          }
        })
        url_list.push(video_url);
      })

      const new_url_list = Array.from(new Set(url_list));
      const table = document.getElementById('videoTable');

      console.log(new_url_list);
      new_url_list.forEach((item) => {
        const row = table.insertRow(-1);
        const cell1 = row.insertCell(-1);
        const cell2 = row.insertCell(-1);
        const url = encodeURI(item);
        cell1.innerHTML = `<video controls width="100%"><source src ="${decodeURI(url)}" type="video/mp4"></video>`;
        cell2.innerHTML = `<a href="${item}" target="_blank">${item}</a>`;
      })

    })
  }

});