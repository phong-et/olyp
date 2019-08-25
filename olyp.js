
let rp = require('request-promise'),
    // request = require('request'),
    // fs = require('fs'),
    // cheerio = require('cheerio'),
    cfg = require('./olyp.cfg.js'),
    Utils = require('./Utils'),
    log = console.log,
    //authenticatedCookies = ['enterdate=2019-08-16+15%3A19%3A24; _ga=GA1.2.b78331434522126.1565957965866; _gcl_au=1.1.1365050805.1565957967; _fbp=fb.1.1565957966833.1233090665; _ym_uid=1565959309747952515; _ym_d=1565959309; last_visited_project=bo; guest_id=1320454970781332875285828147139400156626982092003401857531435879; tr_http_referer=; tr_request_uri=%2Fl%2FLPL31-07en%2Faffiliate%3Faffiliate_id%3D589374%26subid1%3D%26subid2%3D; tr_traffic=%7B%22created_at%22%3A%222019-08-20+05%3A57%3A00%22%2C%22ref_channel%22%3A%22affiliate%22%2C%22land%22%3A%22LPL31-07en%22%2C%22affiliate_id%22%3A589374%2C%22guest_id%22%3A%221320454970781332875285828147139400156626982092003401857531435879%22%7D; _gid=GA1.2.86931852.1566390142; session=1000000000001701425791700202365671566399538160714827823004387280; CSRF-TOKEN=X6RUv9TA1N_GdKNbvZ_X7HRT45IqmiksO4IpJOID3nY; last_hit_timestamp=1566399834390; checked=1; lang=vi_VN; jwt_auth=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NjY0ODI3MTgsIm5iZiI6MTU2NjQ4MjcxOCwiZXhwIjoxNTY3MzQ2NzE4LCJ1c2VyX2lkIjo0ODA2ODIyOSwiZW1haWwiOiJwaGlsbGlwNy5ldEBnbWFpbC5jb20ifQ.on5OllRf8Rj9le1__HnhzlQH8Tqq4CDwMLdndm4jjE1iFAJabvBzzebcqVwgTflK_SY9j8NYvw8ZoAAHDjnFnCO_Jy3eHRRHWT43nPUNBLegnk_8HfbIQdIAQSBZlhcFS4gilKb9dKbTaNGaZwXhzc0apU-tpH3RwePQ-Ql2ssK2chNitxkwykMAsTLfEBGmgpaLqarPbm_xH4AQjZN9hKINSPVwpDswFoxM1_0CmoC-xtTve5mjtYLWJ6oVzM1C45hVQGMnc_i1olTrOgHoaQd7wjstJefMPSv2_-pTfwl5dPvAaJJra3BQSypUOdweQ1NrAVkzOf8iLwnAMlsU6ndqGGtxSjNY5ZhebKhZt8QBsmHcp-e8jNoQCooOTIfkQc9K_KV1MQD1rp3vEG8LX0iKyS1s7NeVKvq9q5zHH0dTlukknpm5R53P_mmbDD5jl_7djoYScbz8vpaw5uoFV22c7jEyY4pYwyfSPhVphW6fkKmGZlMK4xPkUFzZuSdWAvKLJF_wP1OS38otIo9qzEmrr_WndELsU1iFwVU2B_4_GDg0aLx5140Zc3Mr5_sTH50pwekiYcxqFDKS6Kcv3gUuIfuihFjyxPcrc28AqJiMDyS-4LED7jV3Bz2bMx7AAncSsJ6kOUL2JL12nOGyuDpkNDJd72iNidY6nr1ELCo']
    authenticatedCookies = ['enterdate=2019-08-16+15%3A19%3A24; _ga=GA1.2.b78331434522126.1565957965866; _gcl_au=1.1.1365050805.1565957967; _fbp=fb.1.1565957966833.1233090665; props[tutor_bo_step]="DEAL_BUTTONS"; payment_system_name=card; props[bonus_collapsed]=true; _ym_uid=1565959309747952515; _ym_d=1565959309; last_visited_project=bo; _ym_enabled_31957219=1566218786209; guest_id=1320454970781332875285828147139400156626982092003401857531435879; tr_http_referer=https%3A%2F%2Folymptool.com%2F; tr_request_uri=%2Fl%2Faffiliate-new-form%2Faffiliate%3Flang%3Den%26dark%3Dfalse%26square%3Dfalse%26horizontal%3Dfalse%26subid1%3Dtool%26subid2%3Dwb%26affiliate_id%3D129573%26no_redirect%3D1; tr_traffic=%7B%22created_at%22%3A%222019-08-23+07%3A56%3A47%22%2C%22ref_channel%22%3A%22affiliate%22%2C%22land%22%3A%22affiliate-new-form%22%2C%22affiliate_id%22%3A129573%2C%22affiliate_channel%22%3A%22tool%22%2C%22affiliate_channel2%22%3A%22wb%22%2C%22guest_id%22%3A%221320454970781332875285828147139400156626982092003401857531435879%22%7D; checked=1; _gid=GA1.2.28555024.1566650968; props[user_data_enriched48068229]=true; props[chatCol]=true; 500_hits_counter=5; last_hit_timestamp=1566652383806; _dc_gtm_UA-54693962-1=1; session=1000000000001718217581700202365671566652393757711471145675745318; lang=en; jwt_auth=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NjY2NTIzOTQsIm5iZiI6MTU2NjY1MjM5NCwiZXhwIjoxNTY3NTE2Mzk0LCJ1c2VyX2lkIjo0ODA2ODIyOSwiZW1haWwiOiJwaGlsbGlwNy5ldEBnbWFpbC5jb20ifQ.gsK4Xlm346m8eGQiRjJHTZ0HVRVY1x_CyLw6uI1bJJrTKzC6_2PbP5zscFlfGkJzXgDTSyOIbxgNjCmuO4_eotmUNKjOSfvVI_sSY_ALbkTj1DDhXINPfQxP_iGM4StNaJWw9z8a0Ipfe7P2tbvaCRp0o6Hg0HekRm6BOeyXaWbYQBN04C7mBpWkVIWaAsFHt31lZeWMhcmtYdad2DZidNzeR5vcL42tr6zqVDgTE6XZlxpr8r56hjUatED5LPbfdsAOtn6fC3H6kOkMed0Zb9MYJFWQo4488WSMaWAYQwKXd8w79uN-duuPo7-Vzi7yqhrfcYQ7ajFuWWW7I8taWcL27lglaZ7SSyeAPD3iJdPXwQY4r2bDdvx44t9m8bCkWIGYYxImr7pbeeKWruC-TUY-2DgJT6LYeyH7Z83gSjZiR777yFjkp21Op96YIn8NKb-ER6AQ2OxmpNOlilp51VAuAQvPhA7Kg2kfnYv13VrzBPl-4wVpHOsZpkrF-1NWehYXUbWFJdCc533MHpgajj_NiNNDl_KZC_TIy7s0WGesrFDZuLv__dHjV9Lm_dxvsxp-7LIRgUZhQ4ETRM5Hg5xOwnVNbp3plMl30YdjAkg_x1v3_xk7LCg1xS0pik70PCqpLKCqBQLuZ5vfymQR9seH5dCURa7jAiZE_lTXqTE; CSRF-TOKEN=UT8wFXppQAwuoWbjTL9PgyqQREn2Z6aK5XAqNSn2jpg']
function createJar(cookies, rp, url) {
    let jar = rp.jar()
    cookies.forEach(e => {
        e.split(';').forEach(cookie => {
            jar.setCookie(rp.cookie(cookie.trim()), url)
            log(cookie)
        })
    })
    return jar
}
async function login() {
    try {
        let encryptedForm = Message.encryptParams({ username: cfg.username, password: cfg.password })
        log(encryptedForm)
        log(cfg.loginUrl)
        let options = {
            method: 'POST',
            url: cfg.loginUrl,
            headers: cfg.headers,
            form: encryptedForm,
            resolveWithFullResponse: true,
            transform: (body, res) => {
                return { body, headers: res.headers }
            }
        }
        let res = await rp(options)
        log(res.body)
        log(res.headers)
        return res.headers['set-cookie']
    } catch (error) {
        throw error.message
    }
}

async function isValidCookies(authenticatedCookies) {
    if (authenticatedCookies !== '' && authenticatedCookies !== null && authenticatedCookies !== undefined) {
        let options = {
            method: 'GET',
            url: cfg.userUrl,
            headers: cfg.headers,
            jar: createJar(authenticatedCookies, rp, cfg.userUrl),
            resolveWithFullResponse: true,
            transform: (body, res) => {
                return { body: body, headers: res.headers }
            }
        }
        let res = await rp(options)
        log(res.headers)
        //log(res.body)
        Utils.File.save('1.html', res.body)
        //let placeholder = cheerio.load(res.body)('#txt_username').attr('placeholder');

        const WebSocket = require('ws');

        const ws = new WebSocket(cfg.userWebsocketUrl, {
            headers: {
                Cookie: 'session=1000000000001701425791700202365671566399538160714827823004387280; CSRF-TOKEN=X6RUv9TA1N_GdKNbvZ_X7HRT45IqmiksO4IpJOID3nY'
            }
        });

        ws.on('open', function open() {
            log('[close open] :')
            //ws.send('[{ t: 1, e: 105, d: [{ source: "platform" }] }]');
        });

        ws.on('message', function incoming(data) {
            '[message event] :'
            log(data);
        });
        ws.on('close', function (err) {
            log('[close event] :')
            log(err);
        })
        return true
    }
    return false
}

function connectWebsocket() {
    const WebSocket = require('ws');
    log('cfg.userWebsocketUrl:', cfg.userWebsocketUrl)
    //log('cookies:', authenticatedCookies[0])
    const ws = new WebSocket(cfg.userWebsocketUrl, {
        headers: {
            Cookie: authenticatedCookies[0]
        }
    })
    ws.on('open', function open() {
        log('[close open] :')
        //ws.send('[{ t: 1, e: 105, d: [{ source: "platform" }] }]');
    });

    ws.on('message', function incoming(data) {
        '[message event] :'
        log(data);
    });
    ws.on('close', function (err) {
        log('[close event] :')
        log(err);
    })
    return true
}

// TEST FUNCTIONS
(async function () {
    //log(await isValidCookies(authenticatedCookies))
    //connectWebsocket()
    createJar(authenticatedCookies, rp, cfg.loginUrl)
})()

module.exports = {
}
