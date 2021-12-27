export const GetRegisterExistingUserCheck = () => {
    return fetch ("http://localhost:8088/users")
    .then(res => res.json())
}
export const GetTopics = () => {
    return fetch("http://localhost:8088/topics")
    .then(res => res.json())
}
export const GetRequests = () => {
    return fetch("http://localhost:8088/requests")
    .then(res => res.json())
}
export const GetMessages = () => {
    return fetch("http://localhost:8088/messages")
    .then(res => res.json())
}
export const GetStatuses = () => {
    return fetch("http://localhost:8088/statuses")
    .then(res => res.json())
}
export const GetRequestsTopicsUsers = () => {
    return fetch("http://localhost:8088/requests?_expand=user&_expand=topic&_expand=status")
    .then(res => res.json())
}
export const GetRequestsTopicsUsersWithId = (id) => {
    return fetch(`http://localhost:8088/requests?_expand=user&_expand=topic&_expand=status&id=${id}`)
    .then(res => res.json())
}
export const GetRequestsFromUser = (id) => {
    return fetch(`http://localhost:8088/requests?_expand=user&_expand=topic&_expand=status&userId=${id}`)
    .then(res => res.json())
}
export const GetMessagesFromRequests = (id) => {
    return fetch(`http://localhost:8088/messages?_expand=request&requestId=${id}`)
    .then(res => res.json())
}