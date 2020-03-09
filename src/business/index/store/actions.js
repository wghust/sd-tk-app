import Vue from 'vue';
import apis from './apis/index';

const dev = false;

const ajaxHandle = () => {
  const buildUrl = (url, params) => {
    let str = '?'
    for (const key in params) {
      url += str + key + '=' + params[key];
      str = '&';
    }
    return url;
  };

  const strGetObjValue = (obj, str) => {
    let curObj = JSON.parse(JSON.stringify(obj));
    str.split('.').map((key, index) => {
      curObj = curObj[key];
    });
    return curObj;
  };

  const ajaxGet = (url, options, fn) => {
    let results = null;

    if (!Vue.Cookie.getCookie('powersessionid')) {
      window.location.href = 'http://xdpower.tongbanjie.com/login';
    } else {
      if (typeof options === 'function' && arguments.length <= 3) {
        fn = options;
        options = {};
      }

      Vue.http.get(url, options).then((response) => {
        if (response.ok) {
          results = response.body;
          fn(1, results);
        } else {
          fn(0, results);
        }
      }, (error) => {
        if (error) {
          fn(0, results);
        }
      });
    }
  };

  const ajaxJsonp = (url, fn) => {
    let results = null;
    Vue.http.jsonp(url).then((response) => {
      if (response.ok) {
        results = response.body;
        fn(1, results);
      } else {
        fn(0, results);
      }
    }, (error) => {
      if (error) {
        fn(0, results);
      }
    });
  };

  const ajaxPost = (url, params, options, fn) => {
    let results = null;

    if (!Vue.Cookie.getCookie('powersessionid')) {
      window.location.href = 'http://xdpower.tongbanjie.com/login';
    } else {
      if (typeof options === 'function' && arguments.length <= 3) {
        fn = options;
        options = {};
      }

      Vue.http.post(url, params, options).then((response) => {
        if (response.ok) {
          results = response.body;
          fn(1, results);
        } else {
          fn(0, results);
        }
      }, (error) => {
        if (error) {
          fn(0, results);
        }
      });
    }
  };

  const normalAjax = (url, fn, originResult) => {
    const ort = originResult ? originResult : [];
    ajaxGet(url, function(state, results) {
      if (state) {
        let back = ort;
        if (results.status === 0) {
          if (results.data) {
            back = results.data;
          }
        }
        fn(state, back);
      } else {
        fn(state, ort);
      }
    });
  };

  const normalAjaxPost = (url, params, fn, originResult) => {
    const ort = originResult ? originResult : [];
    ajaxPost(url, params, function(state, results) {
      if (state) {
        let back = ort;
        if (results.status === 0) {
          if (results.data) {
            back = results.data;
          }
        }
        fn(state, back);
      } else {
        fn(state, ort);
      }
    });
  };

  return {
    buildUrl: buildUrl,
    strGetObjValue: strGetObjValue,
    ajaxJsonp: ajaxJsonp,
    ajaxGet: ajaxGet,
    ajaxPost: ajaxPost,
    normalAjax: normalAjax,
    normalAjaxPost: normalAjaxPost
  }
};

const ah = ajaxHandle();

const apiObj = {};

for (const key in apis) {
  apiObj[key] = apis[key];
}

export default {

  // 通用post事件 form data
  commonActionPost ({ commit }, payload) {
    const url = ah.strGetObjValue(apiObj, payload[0])
    const params = payload[1] ? payload[1] : {};

    return new Promise((reslove, reject) => {
      if (dev) {
        ah.ajaxJsonp(url, (state, results) => {
          if (state) {
            reslove(results);
          } else {
            reject();
          }
        });
      } else {
        ah.ajaxPost(url, params, (state, results) => {
          if (state) {
            reslove(results);
          } else {
            reject();
          }
        });
      }
    });
  },

  // 通用get事件 form data
  commonActionGet ({ commit }, payload) {
    let url = ah.strGetObjValue(apiObj, payload[0])
    const params = payload[1] ? payload[1] : {};
    url = ah.buildUrl(url, params);

    return new Promise((reslove, reject) => {
      if (dev) {
        ah.ajaxJsonp(url, (state, results) => {
          if (state) {
            reslove(results);
          } else {
            reject();
          }
        });
      } else {
        ah.ajaxGet(url, (state, results) => {
          if (state) {
            reslove(results);
          } else {
            reject();
          }
        });
      }
    });
  },

  // 通用post事件 payload
  commonActionJsonPost ({ commit }, payload) {
    const url = ah.strGetObjValue(apiObj, payload[0])
    const params = payload[1] ? payload[1] : {};

    return new Promise((reslove, reject) => {
      ah.ajaxPost(url, params, {
        emulateJSON: false,
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }, (state, results) => {
        if (state) {
          reslove(results);
        } else {
          reject();
        }
      });
    });
  },

  // 设置vuex通用值
  commonActionCoGet ({ commit }, payload) {
    let url = ah.strGetObjValue(apiObj, payload[0])
    const methodName = payload[1];
    const params = payload[2] ? payload[2] : {};
    url = ah.buildUrl(url, params);

    return new Promise((reslove, reject) => {
      ah.ajaxGet(url, (state, results) => {
        let list = [];
        if (state) {
          if (results.code === 0) {
            list = results.data;
            reslove(true, results.message);
          } else {
            reslove(false, results.message);
          }
        } else {
          reject();
        }
        commit(methodName, list);
      });
    });
  }
}