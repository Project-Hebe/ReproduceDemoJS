import { longIds } from './long.id.js'

const rootURL = 'https://api.jolii.app'

const useMoreVideoToTest = true

let totalLatency = 0
let averageLatency = 0
let finishedRequestCount = 0

/** ms */
const averageDistanceBetweenEachCalling = 1000

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
  : longIds

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
      console.error('URL: ' + url.replace(rootURL + '/api/v1/', '') + videoId)
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
  loadVideoInfoAndTranscript(videoId)
  loadVideoTranslation(videoId)
  loadQuizRecipe(videoId)
  loadQuizType0or1(videoId, 0)
  loadQuizType0or1(videoId, 1)
  loadQuizType2(videoId)
  loadQuizType3(videoId)
  loadKnown(videoId)
  loadUnknown(videoId)
  genQuizByGivenType(videoId, 0)
  genQuizByGivenType(videoId, 1)
  genQuizByGivenType(videoId, 2)
  genQuizByGivenType(videoId, 3)
}

const genQuizByGivenType = async (videoId, type) => {
  const url = `${rootURL}/api/v1/quiz/generate_one_quiz_sentences`

  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    authorization: `bearer ${access_token}`,
  }

  const body = JSON.stringify({
    type,
    words: type == 1 || type == 0 ? ['want'] : undefined,
    sentences: type == 2 || type == 3 ? ['My name is Wangce'] : undefined,
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
      console.error('URL: ' + url.replace(rootURL + '/api/v1/', '') + videoId)
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
      console.error('URL: ' + url.replace(rootURL + '/api/v1/', '') + videoId)
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
      console.error('URL: ' + url.replace(rootURL + '/api/v1/', '') + videoId)
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
      console.error('URL: ' + url.replace(rootURL + '/api/v1/', '') + videoId)
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
      console.error('URL: ' + url.replace(rootURL + '/api/v1/', '') + videoId)
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
      console.error('URL: ' + url.replace(rootURL + '/api/v1/', '') + videoId)
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
      console.error('URL: ' + url.replace(rootURL + '/api/v1/', '') + videoId)
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
      console.error('URL: ' + url.replace(rootURL + '/api/v1/', '') + videoId)
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
      console.error('URL: ' + url.replace(rootURL + '/api/v1/', '') + videoId)
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
      console.error('URL: ' + url.replace(rootURL + '/api/v1/', '') + videoId)
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
