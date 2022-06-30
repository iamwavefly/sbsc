import Router from 'next/router'
import localforage from 'localforage'
import { clearCacheHandler } from './auth'
// import axios from "axios";

export const nonGenUserRequestHandler = (data, referenceId) => {
  localforage.setItem('nonGenUserRequest', { ...data })
  // localforage.setItem('key', data.token.access_token)

  // const tempToken = Cookies.get('token')
  // if (tempToken) Cookies.remove('token')
  // Cookies.set('token', data.token.access_token)

  // axios.defaults.headers.common[
  //   'Authorization'
  // ] = `bearer ${data.token.access_token}`

  Router.push(`/signup?redirectToFund=${referenceId}`)
}

export const getStoredReferenceId = async (email_address) => {
  let requestDetails = await localforage.getItem('nonGenUserRequest')
  if (requestDetails.isStillValid) {
    if (requestDetails.receiver.email_address === email_address) {
      return requestDetails?.referenceId ? requestDetails?.referenceId : null
    }
  }

  return null
}

export const signedInGenUserRequestHandler = (data) => {
  localforage.setItem('signedIngenUserRequest', { ...data })
}

export const prefillSignUpFromGenRequest = async () => {
  let requestDetails = await localforage.getItem('nonGenUserRequest')
  return requestDetails
}

export const redirectBackToFundUserHandler = (referenceId, email_address) => {
  let fundDetails = { referenceId, email_address, status: true }
  return localforage.setItem('redirectToFundUser', fundDetails)
}

// export const getRedirectBackHandler = (referenceId) => {
//   return localforage.setItem("redirectBack", `/quick-funding/${referenceId}`);
// };

export const redirectBackToFundUser = (referenceId) => {
  return Router.push(`/quick-funding?ref=${referenceId}`)
}

export const redirectToLoginForFunding = (fundRefId) => {
  clearCacheHandler()
  setTimeout(() => {
    return Router.push(`/login?redirectToFund${fundRefId}`)
  }, 1000)
}
