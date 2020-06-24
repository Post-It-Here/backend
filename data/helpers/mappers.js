const postToBody = (post) => {
    const result = {
        ...post
    }

    if (post.subs) {
        result.subs = post.subs.map(sub => ({
            ...sub
        }))
    }

    return result;
}

const subToBody = (sub) => {
    return {
        ...sub
    }
}

module.exports = {
    postToBody,
    subToBody
}
