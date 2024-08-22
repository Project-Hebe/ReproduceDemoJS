const rootURL = 'https://api.jolii.app'

const useMoreVideoToTest = true

let totalLatency = 0
let averageLatency = 0
let finishedRequestCount = 0

/** ms */
const averageDistanceBetweenEachCalling = 500

const videoIdsInOurSystem = !useMoreVideoToTest
  ? [
      'zBZgdTb-dns',
      'KR8za0ryYPM',
      'D7G61D3owt0',
      'f_tG_Ol4lNo',
      '3xe5dY87syg',
      'azj3bfN74yo',
      'JzPfMbG1vrE',
      'C7OQHIpDlvA',
      'Szox9wD4HRU',
      'gYwvK8iK_SA',
    ]
  : [
      'zBZgdTb-dns',
      'KR8za0ryYPM',
      'D7G61D3owt0',
      'f_tG_Ol4lNo',
      '3xe5dY87syg',
      'azj3bfN74yo',
      'JzPfMbG1vrE',
      'C7OQHIpDlvA',
      'Szox9wD4HRU',
      'gYwvK8iK_SA',
      'mfxC-C27Nco',
      'uGzVORyavIs',
      'Zk_0nvEAUcI',
      'NJVV1LDt2hE',
      '7x24KF5Ktl8',
      'DzUbPQPbZmw',
      'mqi44pzHsag',
      '4jPgVJfQOhw',
      'aIaqj9hOVLM',
      'liAsT4DqalQ',
      'YSjUfmyiRqk',
      '2gY9sIGp9vk',
      'WncOptJodNw',
      'WhE8Qi0y9gY',
      '7zuk4cVjIMo',
      'qXPCBPAUsh8',
      'ATsH2JDkOOM',
      'qe6F2J3_v3U',
      'BAHY77chGn8',
      'Yv-ttpi4LTg',
      'L4B7XxuJO6A',
      'VqYVhlthOk8',
      'NodcHHWQdwg',
      'AyAQfTxGyqI',
      'E5tRB_GvAMc',
      'nRql8rSUM1U',
      '9p7BI_HNmHo',
      's0i5klg3bSo',
      'NAEEJhfiJF0',
      'cQLlxmqsVdc',
      'TC6XYeDjyvY',
      'IZZEijaJLmI',
      'Lt-oMp16iJY',
      'CwUXNOoMzcI',
      'DSKda9kA6UY',
      'nvVdIJ0las0',
      'N18GlNhX2kI',
      'Sn-F4qPKWyw',
      '_sx97cwmJ3o',
      'CLKXWbrxbp4',
      'kePBvNotYy4',
      'HwLkbtVJ7Tw',
      'ulvrIHnqeT4',
      'xU25QhJ_xiM',
      '4-AhXNAywx8',
      'V2O4J99EgSI',
      '8AEseSofHnI',
      'kslzu2PC7fQ',
      'lhUzq16KM48',
      'xSOzTOe3Vzg',
      'RDkx4J__-QY',
      'Mmve5OXALCY',
      'hoI7RJtcpL0',
      'h5NxBAYlGZQ',
      'jxwzEBRfxLM',
      'rI4UUtBVz3U',
      'rmNQz4KmMds',
      'L5iwCP1Ja5w',
      'x_4AjSwTXdc',
      '4HaThNl8XjY',
      '8AqfLoIBy-E',
      'bTfMSx3YukU',
      'CjzrznCrUTI',
      'tPDSjoCFd9k',
      '-_76wWvygJI',
      'ArLxFjF93-w',
      'v_qPuX9G8uw',
      'BxpUVysR2RI',
      'p0kwsNq3A2w',
      'FJTad0pyB8U',
      'E47g3P64SYw',
      'ad8a2BiXulw',
      'rimSOFeVrYA',
      'CU3Wqb3eadc',
      'bRo1LVq-acw',
      'hbqQL_yMoKc',
      '9ozhdznI3xU',
      'je98X4yQqKY',
      'pyA1znJ8YD0',
      'OLieQ0U3TA4',
      '-JYdkTlIVpw',
      'ukAiceA42r4',
      'j3J3sykmi5A',
      'iuzZXGOJz8g',
      '5KvDlOKa2ZE',
      'EsHGBdyaK_c',
      'lFVBjt_MepU',
      '1AD2UAkHG30',
      'b4Zp75xe6tE',
      'wtz5WwXZh6w',
      'miEQuGVZlDI',
      'cd_eyEJKa_A',
      '_jazQHyzJMg',
      'WPTu1j6-B30',
      'wyHxynLSEho',
      'i5CiDzApsDo',
      'mXMofxtDPUQ',
      '_7YvMB7pa70',
      'kCka94jeGTk',
      'O5oeOrfvlkY',
      'nSIBjdAOOjg',
      'P_QPy8xskMQ',
      '6pphbUCEAFE',
      'VvrG4JguNQk',
      'LF3crlV28xA',
      '4BrS0a5PUFo',
      'kKZ2_mraU4Y',
      'frN3nvhIHUk',
      'ddDN30evKPc',
      '13mftBvRmvM',
      '5pM7Bp3Hcfk',
      'wxyo9S2KAPM',
      'Ez0qR3m1G4g',
      'ykTR0uFGwE0',
      'S6pRqjxD-fQ',
      'pODl29bqO80',
      'YPUS1LWg3jg',
      '_oM-eV2RSQM',
      'wdi9F5_-f9k',
      'Uv1JkBL5728',
      '74FA1dyVVKs',
      'l6A2EFkjXq4',
      'XfFCaTgsW-I',
      'CWn3FUNA8cw',
      'PraN5ZoSjiY',
      '0KBLgJ6UCJ0',
      'gghDRJVxFxU',
      '_C4X8R_48n8',
      'Z6MpMKCt5ec',
      '_Ir0Mc6Qilo',
      'wG79NIO0x7w',
      '8-SWzpdcl6E',
      'QFdLgfy63cc',
      'OwTXpZ4H6-8',
      '8F0NYBBKczM',
      'gYyfun8e2eQ',
      'NZYyQmDJyGg',
      'R9intHqlzhc',
      'lUkTW0pBg2U',
      'kDdg2M1_EuE',
      'drlIUqRYM-w',
      'QXYW-NgP8EA',
      'UidDYQCQ_Mg',
      'DR-cfDsHCGA',
      'QWBGE3WhUUs',
      '2RthUV7yWro',
      '_49PJe-e_i4',
      'bmHAigGgJWA',
      'gEKEjB_pLqQ',
      '_41JR_kVRag',
      'UNLeELm4EUA',
      'pUPM3DtK9so',
      'NVdupTP4N5Q',
      'zXIxDoCRc84',
      'AS5nhKzaOqo',
      'hjFaqDNUVFo',
      'AnZxeX_8mVk',
      'Ut-HbauKzDw',
      'GZ9CwkSgmz8',
      't3tMvIedIgU',
      'e_04ZrNroTo',
      'EfD2k9beP-4',
      'AgTkKGM0TWE',
      'hivHNLqlXes',
      'wmWkevD94m4',
      'hN9wvfe9rWo',
      'yzLh9Y9oOmA',
      'dZrSz4EQ7pY',
      'vp3CPDsbDz8',
      '0x1WRY4fvz4',
      'D-ukmakW6Vs',
      'TD5cSLbHSdk',
      '0s_Zsq0bEeo',
      'pZfmfdSOdvc',
      '2TiuDGCXjSM',
      'fEY_fmLjHNc',
      'koGt-ONE_bA',
      'sbTdLovwscI',
      'iXGbW9D0yTI',
      'RMhfNOHGQnQ',
      'oY7ko0lTwOk',
      'B3oFkwCmNu0',
      'ncyqXudOyrc',
      'Ik7B4iYFRTU',
      '2VeQTuSSiI0',
      'k-CsvMEW8t4',
      '2oumWdjA9hM',
      'zRYGCIdhMAM',
      'lbtglBjKogE',
      'WQ4MaTlbg4o',
      'nqrI2rp4Q9s',
      'mngiqrT44Pk',
      'aX7m64qrtDk',
      'ofu_89J_HVI',
      'bZJhJdla05I',
      'WPPRYPKt6G0',
      'i9GlEYf8_5I',
      'RZa8vlO-kW4',
      'rBrd_3VMC3c',
      'ujNeHIo7oTE',
      '-XYBj0J99i8',
      'ZbZSe6N_BXs',
      'd-diB65scQU',
      'XAFS43NKFag',
      '9oCLf_gEzhE',
      '2DYkaShGib8',
      'sxxOu8AGe8s',
      'h_YG8B_Wh6o',
      'xJ_ymeeaYX4',
      'NXfhFqoG7Ck',
      'llLzVqvasNk',
      'F5IqVyjLA3U',
      'Q04ROZOHruc',
      'P85r-W0Ck6w',
      'lBzQLGOrpfM',
      '-OknSRRyFJE',
      'W-eJIgTrBTo',
      'PZa3XKjoAtY',
      'SOCme0nkgns',
      'g8YH2pQ3YLc',
      'ckKQclquAXU',
      'jB9psPqg6nY',
      '0Kg8dtwzJ7c',
      '_-oBC6-7osw',
      '11e9IzV2cCQ',
      'l1JIqxXmZhU',
      'IesWWZEh604',
      'QZQyV9BB50E',
      'w0YQwglgtTM',
      'KN2jyw6D1ak',
      'E14nkRf58b0',
      'GnQ2iCIpOmE',
      'hzsVC0_Dv18',
      'UbxUSsFXYo4',
      'WcwHsw7tyO8',
      'wpjspHgHU9g',
      'Amkg1cdDCpM',
      'jlysg_DezpY',
      'jQCxy43FiOQ',
      'i2gDAMV-HvQ',
      'gxvcwnomeX4',
      'xT_9FAPvI3E',
      'SpVeRQ7DoiA',
      'WmVLcj-XKnM',
      'rM6txLtoaoc',
      'PN_4IpCgVIQ',
      'tTw2-aHcUEA',
      'zqRDbDiXwxs',
      'FU-lk2u4W08',
      'lZGnEC8y158',
      'g2aGWKeIlHQ',
      'P07U6lBdMvg',
      's6TXDFp1EcM',
      'etvW0FOD_so',
      'eOs0cZ12Fhk',
      'U8L2m8TeIWA',
      '7FBr-G0ur9I',
      'hWzmwCbz6ow',
      'XozfVWyCxXY',
      'gxaTP6zF9Vc',
      'dBKIpi9mHhk',
      'fLexgOxsZu0',
      'SlPhMPnQ58k',
      'IcrbM1l_BoI',
      '2Vv-BfVoq4g',
      'eVli-tstM5E',
      'GrKQvyXpNgc',
      'GemKqzILV4w',
      'S5SfHVkefQ8',
      '639hmHOg2Ao',
      'WSUj3PRvzzg',
      'Db8_yLyT1GM',
      'YsZ-lx_3eoM',
      'lTtfqECMEb8',
      'lWf_UUXoyWI',
      'KQ0PhJJ4IE8',
      'tEmt1Znux58',
      'aIa9u3ZE6y0',
      'hmFQqjMF_f0',
      'LBQfQu5n_w0',
      'lcB0LYNp0oI',
      'QRULM9U5QXw',
      'j8OfpXnd3Ag',
      'pUaDJwh9Q-8',
      'aaExiKsvt9A',
      '0-__dGloMyw',
      '4XuB_U69nAY',
      '0JCWdWCgIcc',
      'cesGPbGZbXs',
      'H5rAXo-jYV8',
      'mqxNuaK2uZE',
      '2TS_cuwGkzE',
      'biX7NNxw_w8',
      'GyT1wPQSER8',
      'jFCFqjovH3s',
      'J3adQtRXNBw',
      'xCkEwbRaWBU',
      'cTIUiN6inIQ',
      'gWmRkYsLzB4',
      '9Y-YJEtxHeo',
      '4eIDBV4Mpek',
      'FWTNMzK9vG4',
      'xQ156y4TtJs',
      '2_lBiFZ85d0',
      'BaxELeuIBfE',
      'OQ_flALWqpU',
      'E-d1Hozj6-s',
      'RjsIwk96w1k',
      'Ry2QA4nu5a4',
      'VcSX4ytEfcE',
      'ij_xXZAhJPs',
      'CUaZ5IGL3AY',
      'xmaqrw6GJPM',
      'TshdnYj7G2U',
      'OdYxrbbXcAo',
      'UwVNkfCov1k',
      'eqL1U7wx1HI',
      'UtovFBszyng',
      'ldQOrbF0kqc',
      'eS5DPDojmkk',
      'n804iflkIGw',
      'BigKlKrY0B4',
      'fG7dJ6A3l7w',
      'keOaQm6RpBg',
      'ZX53YSKPssQ',
      'dXQycMakyRw',
      'ftZr1_Ny8L8',
      'TyceVYt_474',
      'suAR1PYFNYA',
      'y8AWFf7EAc4',
      'JRfuAukYTKg',
      'b1kbLwvqugk',
      'G7KNmW9a75Y',
      'yFckWsYqvnk',
      '34k7UI-DR_8',
      'L0oq1rvwwxs',
      '5nCcE-jABSo',
      'Ksw-arKvMPk',
      '6_q_LHq85Cs',
      '_cQKsYYhF20',
      'ZXnHE1tZQjo',
      'usL5axI1KAY',
      'l4vkk39oqyA',
      'AUrrPO46Kx0',
      'Y0mIy45A710',
      'r4OP65K88hI',
      'MyqhDKNig88',
      'GTiRajt-ZnM',
      'Atkt-vhxFIc',
      'zL_vNn06a5M',
      'vdsex0upWy8',
      'YpI0jgqNJGc',
      'L0MK7qz13bU',
      'nnZN-FDKYwE',
      'MAHwLed1kBs',
      'wVbQki1V3yA',
      'vkmAhUtoyDw',
      'rs_jxD5XBaA',
      'rhgwIhB58PA',
      'wVfhXYdTcdQ',
      '0vV-T9zZHEw',
      'mZdUpMnvITA',
      'P8b4mZvrui4',
      'cRDgnLa42PQ',
      'xuEpU_IdvNo',
      '2gEwEcYnewE',
      '3b_WaZwn_DY',
      'NICodKeadp0',
      'ysa5OBhXz-Q',
      'Wx9vPv-T51I',
      'fR7bXsoNwwE',
      '4r7Tvpf3k6k',
      'k2kiyWu_XNc',
      '5xjHZ-ENzzg',
      '-mwuc7fRLB0',
      'z8Otk01Xi-U',
      'sJO7jn3OXQ8',
      'ksiskwlNNVs',
      '7K3KdgDcdYc',
      '8zI-Q1MW_2o',
      '_Z_FOtfKyfo',
      'Qr8QsNCe3C4',
      'FcN3HnQz3y4',
      'NB5Mc_Ym5qI',
      'YEaSxhcns7Y',
      'vqWvqUTHHkM',
      '5HRPGZwxlNo',
      'djSdNxWga_0',
      'XnbCSboujF4',
      '_GFkHA5EZdE',
      'q07_k5VKuaQ',
      'NTpbbQUBbuo',
      '22tVWwmTie8',
      'H58vbez_m4E',
      'pMX2cQdPubk',
      'TitZV6k8zfA',
      'eAagtcAup0o',
      'viu9AtdzUEM',
      'C_7tmv4IqaE',
      'bFIB05LGtMs',
      '8W1c4XnO4qk',
      'lPrjP4A_X4s',
      '3xXOP8tWMJE',
      'Fm0G-4DEIuM',
      '9HvTRg7LCio',
      '7Ch9gL8AO1s',
      'PWdPLZvdO_I',
      'uQ8yDdtoFj0',
      'xezpQ4SI57Q',
      '0kXCPo7c63I',
      'I7LJIuB2CHE',
      'jBfMs-YskHo',
      'r6cJl89axqY',
      'rPe4yziWiOg',
      'GSmBYqmz4Y4',
      '-s3UwOq1P1E',
      'A7LU5Wxc_0Y',
      'i-xn8GTefe4',
    ]

const languageCodes = [
  'en',
  'zh-Hans',
  'zh-Hant',
  'ja',
  'ko',
  'de',
  'es',
  'fr',
  'ru',
  'ar',
]

let access_token = ''
let firstPlayhead = 156398

const main = async () => {
  const data = await fetchToken()
  if (!data) {
    console.error('❌ Can not sign in')
    return
  } else {
    console.log('✅ Sign in success')
  }
  access_token = data.access_token

  console.log('🚧 simulating user actions')

  for (const id of videoIdsInOurSystem) {
    await enterVideoPage(id)
    await wait(
      Math.floor(Math.random() * averageDistanceBetweenEachCalling) * 2 + 1
    )
  }

  process.stdin.resume()
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const fetchToken = async () => {
  const url = rootURL + '/token'

  const headers = new Headers({
    'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
  })

  const body = new URLSearchParams()
  body.append('username', 'wangce@hebe.com')
  body.append('password', '12345678')

  const startTime = Date.now()
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: body.toString(),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    if (response.status != 200) {
      console.error('\n')
      console.error('❌ Server Error')
      console.error('http status:' + response.status)
      console.error('http status text:' + response.statusText)
      console.error('URL: ' + url.replace(rootURL + '/api/v1/', ''))
      console.error('The response of our server is:')
      let text = await response.text()
      if (text.length > 20) text = text.substring(0, 20) + '...'
      console.error(text)
      return
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error:', error)
  } finally {
    const endTime = Date.now()
    finishedRequestCount += 1
    totalLatency += endTime - startTime
    averageLatency = totalLatency / finishedRequestCount
    console.log(
      `🚧 Request duration: ${endTime - startTime}ms` +
        '  ⏰ Average Latency: ' +
        averageLatency.toFixed(0) +
        'ms'
    )
  }
}

const enterVideoPage = async (videoId) => {
  // loadVideoInfoAndTranscript(videoId)
  // loadVideoTranslation(videoId)
  // loadQuizRecipe(videoId)
  loadQuizType0or1(videoId, 0)
  loadQuizType0or1(videoId, 1)
  // loadQuizType2(videoId)
  // loadQuizType3(videoId)
  // loadKnown(videoId)
  // loadUnknown(videoId)
}

const loadVideoInfoAndTranscript = async (videoId) => {
  const url = `${rootURL}/api/v1/videos/${videoId}?`

  const headers = {
    'content-type': 'application/json',
    authorization: `bearer ${access_token}`,
  }

  const startTime = Date.now()
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    })

    if (response.status != 200) {
      console.error('\n')
      console.error('❌ Server Error')
      console.error('http status:' + response.status)
      console.error('http status text:' + response.statusText)
      console.error('URL: ' + url.replace(rootURL + '/api/v1/', ''))
      console.error('The response of our server is:')
      let text = await response.text()
      if (text.length > 20) text = text.substring(0, 20) + '...'
      console.error(text)
      return
    }
    const data = await response.json()
    console.log('')
    console.log(`✅ ${url.replace(rootURL + '/api/v1/', '')}` + ' : ' + videoId)
    console.log(data)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    finishedRequestCount += 1
    averageLatency = totalLatency / finishedRequestCount
    const endTime = Date.now()
    totalLatency += endTime - startTime
    console.log(
      `🚧 Request duration: ${endTime - startTime}ms` +
        '  ⏰ Average Latency: ' +
        averageLatency.toFixed(0) +
        'ms'
    )
  }
}

const loadVideoTranslation = async (videoId) => {
  const lCode = languageCodes[Math.floor(Math.random() * languageCodes.length)]
  const url = `${rootURL}/api/v1/videos/${videoId}/translate?target_language=${lCode}`

  const startTime = Date.now()
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${access_token}`,
      },
    })

    if (response.status != 200) {
      console.error('\n')
      console.error('❌ Server Error')
      console.error('http status:' + response.status)
      console.error('http status text:' + response.statusText)
      console.error('URL: ' + url.replace(rootURL + '/api/v1/', ''))
      console.error('The response of our server is:')
      let text = await response.text()
      if (text.length > 20) text = text.substring(0, 20) + '...'
      console.error(text)
      return
    }
    const data = await response.json()
    console.log('')
    console.log(`✅ ${url.replace(rootURL + '/api/v1/', '')}` + ' : ' + videoId)
    console.log(data)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    finishedRequestCount += 1
    averageLatency = totalLatency / finishedRequestCount
    const endTime = Date.now()
    totalLatency += endTime - startTime
    console.log(
      `🚧 Request duration: ${endTime - startTime}ms` +
        '  ⏰ Average Latency: ' +
        averageLatency.toFixed(0) +
        'ms'
    )
  }
}

const loadQuizRecipe = async (videoId) => {
  const url = `${rootURL}/api/v1/quiz/quiz_recipe`
  const data = {
    video_id: videoId,
    playhead: firstPlayhead,
  }

  const startTime = Date.now()
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json; charset=utf-8',
        authorization: `bearer ${access_token}`,
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()
    console.log('')
    console.log(`✅ ${url.replace(rootURL + '/api/v1/', '')}` + ' : ' + videoId)
    console.log(result)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    finishedRequestCount += 1
    averageLatency = totalLatency / finishedRequestCount
    const endTime = Date.now()
    totalLatency += endTime - startTime
    console.log(
      `🚧 Request duration: ${endTime - startTime}ms` +
        '  ⏰ Average Latency: ' +
        averageLatency.toFixed(0) +
        'ms'
    )
  }
}

const loadQuizType0or1 = async (videoId, type) => {
  const url = `${rootURL}/api/v1/quiz/generate_one_quiz`

  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    authorization: `bearer ${access_token}`,
  }

  const body = JSON.stringify({
    video_id: videoId,
    playhead: firstPlayhead,
    type: type,
  })

  const startTime = Date.now()
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: body,
    })

    if (response.status != 200) {
      console.error('\n')
      console.error('❌ Server Error')
      console.error('body:' + body)
      console.error('http status:' + response.status)
      console.error('http status text:' + response.statusText)
      console.error('URL: ' + url.replace(rootURL + '/api/v1/', ''))
      console.error('The response of our server is:')
      let text = await response.text()
      if (text.length > 20) text = text.substring(0, 20) + '...'
      console.error(text)
      return
    }
    const data = await response.json()

    if (data.quizzes.length == 0) {
      console.error('\n')
      console.error('❌ Server Error')
      console.error('body:' + body)
      console.error('http status:' + response.status)
      console.error('http status text:' + response.statusText)
      console.error('URL: ' + url.replace(rootURL + '/api/v1/', ''))
      console.error('The response of our server is:')
      console.error(data)
      return
    }

    console.log('')
    console.log(`✅ ${url.replace(rootURL + '/api/v1/', '')}` + ' : ' + videoId)
    console.log(data)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    finishedRequestCount += 1
    averageLatency = totalLatency / finishedRequestCount
    const endTime = Date.now()
    totalLatency += endTime - startTime
    console.log(
      `🚧 Request duration: ${endTime - startTime}ms` +
        '  ⏰ Average Latency: ' +
        averageLatency.toFixed(0) +
        'ms'
    )
  }
}

const loadQuizType1 = async (videoId) => {
  const url = `${rootURL}/api/v1/quiz/generate_one_quiz`

  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    authorization: `bearer ${access_token}`,
  }

  const body = JSON.stringify({
    video_id: videoId,
    playhead: firstPlayhead,
    type: 1,
  })

  const startTime = Date.now()
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: body,
    })

    if (response.status != 200) {
      console.error('\n')
      console.error('❌ Server Error')
      console.error('body:' + body)
      console.error('http status:' + response.status)
      console.error('http status text:' + response.statusText)
      console.error('URL: ' + url.replace(rootURL + '/api/v1/', ''))
      console.error('The response of our server is:')
      let text = await response.text()
      if (text.length > 20) text = text.substring(0, 20) + '...'
      console.error(text)
      return
    }
    const data = await response.json()
    console.log('')
    console.log(`✅ ${url.replace(rootURL + '/api/v1/', '')}` + ' : ' + videoId)
    console.log(data)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    finishedRequestCount += 1
    averageLatency = totalLatency / finishedRequestCount
    const endTime = Date.now()
    totalLatency += endTime - startTime
    console.log(
      `🚧 Request duration: ${endTime - startTime}ms` +
        '  ⏰ Average Latency: ' +
        averageLatency.toFixed(0) +
        'ms'
    )
  }
}

const loadQuizType2 = async (videoId) => {
  const url = `${rootURL}/api/v1/quiz/echoing`

  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    authorization: `bearer ${access_token}`,
  }

  const body = JSON.stringify({
    video_id: videoId,
    playhead: firstPlayhead,
  })

  const startTime = Date.now()
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: body,
    })

    if (response.status != 200) {
      console.error('\n')
      console.error('❌ Server Error')
      console.error('http status:' + response.status)
      console.error('http status text:' + response.statusText)
      console.error('URL: ' + url.replace(rootURL + '/api/v1/', ''))
      console.error('The response of our server is:')
      let text = await response.text()
      if (text.length > 20) text = text.substring(0, 20) + '...'
      console.error(text)
      return
    }
    const data = await response.json()
    console.log('')
    console.log(`✅ ${url.replace(rootURL + '/api/v1/', '')}` + ' : ' + videoId)
    console.log(data)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    finishedRequestCount += 1
    averageLatency = totalLatency / finishedRequestCount
    const endTime = Date.now()
    totalLatency += endTime - startTime
    console.log(
      `🚧 Request duration: ${endTime - startTime}ms` +
        '  ⏰ Average Latency: ' +
        averageLatency.toFixed(0) +
        'ms'
    )
  }
}

const loadQuizType3 = async (videoId) => {
  const url = `${rootURL}/api/v1/quiz/conversation`

  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    authorization: `bearer ${access_token}`,
  }

  const body = JSON.stringify({
    video_id: videoId,
    playhead: firstPlayhead,
  })

  const startTime = Date.now()
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: body,
    })

    if (response.status != 200) {
      console.error('\n')
      console.error('❌ Server Error')
      console.error('http status:' + response.status)
      console.error('http status text:' + response.statusText)
      console.error('URL: ' + url.replace(rootURL + '/api/v1/', ''))
      console.error('The response of our server is:')
      let text = await response.text()
      if (text.length > 20) text = text.substring(0, 20) + '...'
      console.error(text)
      return
    }
    const data = await response.json()
    console.log('')
    console.log(`✅ ${url.replace(rootURL + '/api/v1/', '')}` + ' : ' + videoId)
    console.log(data)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    finishedRequestCount += 1
    averageLatency = totalLatency / finishedRequestCount
    const endTime = Date.now()
    totalLatency += endTime - startTime
    console.log(
      `🚧 Request duration: ${endTime - startTime}ms` +
        '  ⏰ Average Latency: ' +
        averageLatency.toFixed(0) +
        'ms'
    )
  }
}

const loadUnknown = async (videoId) => {
  const url = `${rootURL}/api/v1/user-vocabularies/unknown`

  const headers = {
    'content-type': 'application/json',
    authorization: `bearer ${access_token}`,
  }

  const startTime = Date.now()
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    })

    if (response.status != 200) {
      console.error('\n')
      console.error('❌ Server Error')
      console.error('http status:' + response.status)
      console.error('http status text:' + response.statusText)
      console.error('URL: ' + url.replace(rootURL + '/api/v1/', ''))
      console.error('The response of our server is:')
      let text = await response.text()
      if (text.length > 20) text = text.substring(0, 20) + '...'
      console.error(text)
      return
    }
    const data = await response.json()
    console.log('')
    console.log(`✅ ${url.replace(rootURL + '/api/v1/', '')}` + ' : ' + videoId)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    finishedRequestCount += 1
    averageLatency = totalLatency / finishedRequestCount
    const endTime = Date.now()
    totalLatency += endTime - startTime
    console.log(
      `🚧 Request duration: ${endTime - startTime}ms` +
        '  ⏰ Average Latency: ' +
        averageLatency.toFixed(0) +
        'ms'
    )
  }
}

const loadKnown = async (videoId) => {
  const url = `${rootURL}/api/v1/user-vocabularies/known`

  const headers = {
    'content-type': 'application/json',
    authorization: `bearer ${access_token}`,
  }

  const startTime = Date.now()
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    })

    if (response.status != 200) {
      console.error('\n')
      console.error('❌ Server Error')
      console.error('http status:' + response.status)
      console.error('http status text:' + response.statusText)
      console.error('URL: ' + url.replace(rootURL + '/api/v1/', ''))
      console.error('The response of our server is:')
      let text = await response.text()
      if (text.length > 20) text = text.substring(0, 20) + '...'
      console.error(text)
      return
    }
    const data = await response.json()
    console.log('')
    console.log(`✅ ${url.replace(rootURL + '/api/v1/', '')}` + ' : ' + videoId)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    finishedRequestCount += 1
    averageLatency = totalLatency / finishedRequestCount
    const endTime = Date.now()
    totalLatency += endTime - startTime
    console.log(
      `🚧 Request duration: ${endTime - startTime}ms` +
        '  ⏰ Average Latency: ' +
        averageLatency.toFixed(0) +
        'ms'
    )
  }
}

main()
