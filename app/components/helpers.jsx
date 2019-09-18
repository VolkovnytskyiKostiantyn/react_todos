// @flow

async function callApi(
  type: string,
  customBody: ?{} = {},
  additionalPath: string = '/',
): Object {
  let response
  const token = localStorage.getItem('token')
  if (type === 'GET' || type === 'HEAD') {
    response = await fetch(`http://localhost:3010${additionalPath}`, {
      method: type,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `${token || 'no token'}`,
      },
    })
  } else {
    response = await fetch(`http://localhost:3010${additionalPath}`, {
      method: type,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `${token || 'no token'}`,
      },
      body: JSON.stringify(customBody),
    })
  }
  return response
}


export default callApi
