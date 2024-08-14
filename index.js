const rootURL = 'http://178.128.80.88'

const videoIds = [
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
    await wait(2000)
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
      console.error('\n')
      return
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error:', error)
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
    'user-agent': 'Dart/3.4 (dart:io)',
    'content-type': 'application/json',
    'accept-encoding': 'gzip',
    'content-length': '0',
    authorization: `bearer ${access_token}`,
  }

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
      console.error('\n')
      return
    }
    const data = await response.json()
    console.log('')
    console.log(`✅ ${url.replace(rootURL + '/api/v1/', '')}`)
    console.log(videoId)
    console.log(data)
  } catch (error) {
    console.error('Error:', error)
  }
}

const loadVideoTranslation = async (videoId) => {
  const url = `${rootURL}/api/v1/videos/${videoId}/translate?target_language=ja`

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
      console.error('\n')
      return
    }
    const data = await response.json()
    console.log('')
    console.log(`✅ ${url.replace(rootURL + '/api/v1/', '')}`)
    console.log(videoId)
    console.log(data)
  } catch (error) {
    console.error('Error:', error)
  }
}

const loadQuizRecipe = async (videoId) => {
  const url = `${rootURL}/api/v1/quiz/quiz_recipe`
  const data = {
    video_id: videoId,
    playhead: firstPlayhead,
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'user-agent': 'Dart/3.4 (dart:io)',
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
      console.error('\n')
      return
    }
    const data = await response.json()
    console.log('')
    console.log(`✅ ${url.replace(rootURL + '/api/v1/', '')}`)
    console.log(videoId)
    console.log(data)
  } catch (error) {
    console.error('Error:', error)
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
      console.error('\n')
      return
    }
    const data = await response.json()
    console.log('')
    console.log(`✅ ${url.replace(rootURL + '/api/v1/', '')}`)
    console.log(videoId)
    console.log(data)
  } catch (error) {
    console.error('Error:', error)
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
      console.error('\n')
      return
    }
    const data = await response.json()
    console.log('')
    console.log(`✅ ${url.replace(rootURL + '/api/v1/', '')}`)
    console.log(videoId)
    console.log(data)
  } catch (error) {
    console.error('Error:', error)
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
      console.error('\n')
      return
    }
    const data = await response.json()
    console.log('')
    console.log(`✅ ${url.replace(rootURL + '/api/v1/', '')}`)
    console.log(videoId)
    console.log(data)
  } catch (error) {
    console.error('Error:', error)
  }
}

const loadUnknown = async () => {
  const url = `${rootURL}/api/v1/user-vocabularies/unknown`

  const headers = {
    'user-agent': 'Dart/3.4 (dart:io)',
    'content-type': 'application/json',
    'accept-encoding': 'gzip',
    'content-length': '0',
    authorization: `bearer ${access_token}`,
  }

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
      console.error('\n')
      return
    }
    const data = await response.json()
    console.log('')
    console.log(`✅ ${url.replace(rootURL + '/api/v1/', '')}`)
    console.log(data)
  } catch (error) {
    console.error('Error:', error)
  }
}

const loadKnown = async () => {
  const url = `${rootURL}/api/v1/user-vocabularies/known`

  const headers = {
    'user-agent': 'Dart/3.4 (dart:io)',
    'content-type': 'application/json',
    'accept-encoding': 'gzip',
    'content-length': '0',
    authorization: `bearer ${access_token}`,
  }

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
      console.error('\n')
      return
    }
    const data = await response.json()
    console.log('')
    console.log(`✅ ${url.replace(rootURL + '/api/v1/', '')}`)
    console.log(data)
  } catch (error) {
    console.error('Error:', error)
  }
}

main()
