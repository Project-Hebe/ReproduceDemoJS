const rootURL = 'http://178.128.80.88'

const useMoreVideoToTest = false

const videoIds = !useMoreVideoToTest
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

  for (const id of videoIds) {
    await enterVideoPage(id)
    await wait(Math.floor(Math.random() * 4000) + 1)
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
      console.error(await response.text())
      return
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error:', error)
  } finally {
    const endTime = Date.now()
    console.log(`🚧 Request duration: ${endTime - startTime}ms`)
  }
}

const enterVideoPage = async (videoId) => {
  loadVideoInfo(videoId)
  loadVideoTranslation(videoId)
  loadQuizRecipe(videoId)
  loadQuizType0(videoId)
  loadQuizType1(videoId)
  loadQuizType2(videoId)
  loadQuizType3(videoId)
  loadKnown()
  loadUnknown()
}

const loadVideoInfo = async (videoId) => {
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
      console.error(await response.text())
      return
    }
    const data = await response.json()
    console.log('')
    console.log(`✅ ${url.replace(rootURL + '/api/v1/', '')}`)
    console.log(videoId)
    console.log(data)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    const endTime = Date.now()
    console.log(`🚧 Request duration: ${endTime - startTime}ms`)
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
      console.error(await response.text())
      return
    }
    const data = await response.json()
    console.log('')
    console.log(`✅ ${url.replace(rootURL + '/api/v1/', '')}`)
    console.log(videoId)
    console.log(data)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    const endTime = Date.now()
    console.log(`🚧 Request duration: ${endTime - startTime}ms`)
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
    console.log(`✅ ${url.replace(rootURL + '/api/v1/', '')}`)
    console.log(videoId)
    console.log(result)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    const endTime = Date.now()
    console.log(`🚧 Request duration: ${endTime - startTime}ms`)
  }
}

const loadQuizType0 = async (videoId) => {
  const url = `${rootURL}/api/v1/quiz/generate_one_quiz`

  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    authorization: `bearer ${access_token}`,
  }

  const body = JSON.stringify({
    video_id: videoId,
    playhead: firstPlayhead,
    type: 0,
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
      console.error(await response.text())
      return
    }
    const data = await response.json()
    console.log('')
    console.log(`✅ ${url.replace(rootURL + '/api/v1/', '')}`)
    console.log(videoId)
    console.log(data)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    const endTime = Date.now()
    console.log(`🚧 Request duration: ${endTime - startTime}ms`)
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
      console.error('http status:' + response.status)
      console.error('http status text:' + response.statusText)
      console.error('URL: ' + url.replace(rootURL + '/api/v1/', ''))
      console.error('The response of our server is:')
      console.error(await response.text())
      return
    }
    const data = await response.json()
    console.log('')
    console.log(`✅ ${url.replace(rootURL + '/api/v1/', '')}`)
    console.log(videoId)
    console.log(data)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    const endTime = Date.now()
    console.log(`🚧 Request duration: ${endTime - startTime}ms`)
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
      console.error(await response.text())
      return
    }
    const data = await response.json()
    console.log('')
    console.log(`✅ ${url.replace(rootURL + '/api/v1/', '')}`)
    console.log(videoId)
    console.log(data)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    const endTime = Date.now()
    console.log(`🚧 Request duration: ${endTime - startTime}ms`)
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
      console.error(await response.text())
      return
    }
    const data = await response.json()
    console.log('')
    console.log(`✅ ${url.replace(rootURL + '/api/v1/', '')}`)
    console.log(videoId)
    console.log(data)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    const endTime = Date.now()
    console.log(`🚧 Request duration: ${endTime - startTime}ms`)
  }
}

const loadUnknown = async () => {
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
      console.error(await response.text())
      return
    }
    const data = await response.json()
    console.log('')
    console.log(`✅ ${url.replace(rootURL + '/api/v1/', '')}`)
    console.log(data)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    const endTime = Date.now()
    console.log(`🚧 Request duration: ${endTime - startTime}ms`)
  }
}

const loadKnown = async () => {
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
      console.error(await response.text())
      return
    }
    const data = await response.json()
    console.log('')
    console.log(`✅ ${url.replace(rootURL + '/api/v1/', '')}`)
    console.log(data)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    const endTime = Date.now()
    console.log(`🚧 Request duration: ${endTime - startTime}ms`)
  }
}

main()
