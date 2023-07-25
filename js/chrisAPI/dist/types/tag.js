"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedTagList = exports.TagFeedList = exports.FeedTaggingList = exports.TagTaggingList = exports.Tagging = exports.TagList = exports.Tag = void 0;
/** * Imports ***/
const resource_1 = require("./resource");
const feed_1 = require("./feed");
/**
 * Tag item resource object representing a feed tag.
 */
class Tag extends resource_1.ItemResource {
    /**
     * Constructor
     *
     * @param {string} url - url of the resource
     * @param {Object} auth - authentication object
     * @param {string} auth.token - authentication token
     */
    constructor(url, auth) {
        super(url, auth);
    }
    /**
     * Fetch a list of feeds that are tagged with this tag from the REST API.
     *
     * @param {Object} [params=null] - page parameters object
     * @param {number} [params.limit] - page limit
     * @param {number} [params.offset] - page offset
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<TagFeedList>} - JS Promise, resolves to a ``TagFeedList`` object
     */
    getTaggedFeeds(params = null, timeout = 30000) {
        const linkRelation = 'feeds';
        const resourceClass = TagFeedList;
        return this._getResource(linkRelation, resourceClass, params, timeout);
    }
    /**
     * Fetch a list of taggings made with this tag from the REST API.
     *
     * @param {Object} [params=null] - page parameters object
     * @param {number} [params.limit] - page limit
     * @param {number} [params.offset] - page offset
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<TagTaggingList>} - JS Promise, resolves to a ``TagTaggingList`` object
     */
    getTaggings(params = null, timeout = 30000) {
        const linkRelation = 'taggings';
        const resourceClass = TagTaggingList;
        return this._getResource(linkRelation, resourceClass, params, timeout);
    }
    /**
     * Make a PUT request to modify this tag item resource through the REST API.
     *
     * @param {Object} data - request JSON data object
     * @param {string} [data.name] - tag name
     * @param {string} [data.color] - tag color
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<this>} - JS Promise, resolves to ``this`` object
     */
    put(data, timeout = 30000) {
        return this._put(data, null, timeout);
    }
    /**
     * Make a DELETE request to delete this tag item resource through the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise} - JS Promise
     */
    delete(timeout = 30000) {
        return this._delete(timeout);
    }
}
exports.Tag = Tag;
/**
 * Tag list resource object representing a list of a feed's tags.
 */
class TagList extends resource_1.ListResource {
    /**
     * Constructor
     *
     * @param {string} url - url of the resource
     * @param {Object} auth - authentication object
     * @param {string} auth.token - authentication token
     */
    constructor(url, auth) {
        super(url, auth);
        /** @type {Object} */
        this.itemClass = Tag;
    }
    /**
     * Fetch a list of feeds from the REST API.
     *
     * @param {Object} [searchParams=null] - search parameters object which is
     * resource-specific, the ``FeedList.getSearchParameters`` method can be
     * used to get a list of possible search parameters
     * @param {number} [searchParams.limit] - page limit
     * @param {number} [searchParams.offset] - page offset
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<FeedList>} - JS Promise, resolves to a ``FeedList`` object
     */
    getFeeds(searchParams = null, timeout = 30000) {
        const linkRelation = 'feeds';
        const resourceClass = feed_1.FeedList;
        return this._getResource(linkRelation, resourceClass, searchParams, timeout);
    }
    /**
     * Make a POST request to this tag list resource to create a new tag item resource
     * through the REST API.
     *
     * @param {Object} data - request JSON data object
     * @param {string} [data.name] - tag name
     * @param {string} [data.color] - tag color
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<this>} - JS Promise, resolves to ``this`` object
     */
    post(data, timeout = 30000) {
        return this._post(data, null, timeout);
    }
}
exports.TagList = TagList;
/**
 * Tagging item resource object representing a tagging of an specific feed with an
 * specific tag.
 */
class Tagging extends resource_1.ItemResource {
    /**
     * Constructor
     *
     * @param {string} url - url of the resource
     * @param {Object} auth - authentication object
     * @param {string} auth.token - authentication token
     */
    constructor(url, auth) {
        super(url, auth);
    }
    /**
     * Fetch the tag associated to this tagging from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Tag>} - JS Promise, resolves to a ``Tag`` object
     */
    getTag(timeout = 30000) {
        const linkRelation = 'tag';
        const resourceClass = Tag;
        return this._getResource(linkRelation, resourceClass, null, timeout);
    }
    /**
     * Fetch the feed associated to this tagging from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Feed>} - JS Promise, resolves to a ``Feed`` object
     */
    getFeed(timeout = 30000) {
        const linkRelation = 'feed';
        const resourceClass = feed_1.Feed;
        return this._getResource(linkRelation, resourceClass, null, timeout);
    }
    /**
     * Make a DELETE request to delete this tagging item resource through the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise} - JS Promise
     */
    delete(timeout = 30000) {
        return this._delete(timeout);
    }
}
exports.Tagging = Tagging;
/**
 * Tag-specific tagging list resource object representing a list of taggings made with an
 * specific tag.
 */
class TagTaggingList extends resource_1.ListResource {
    /**
     * Constructor
     *
     * @param {string} url - url of the resource
     * @param {Object} auth - authentication object
     * @param {string} auth.token - authentication token
     */
    constructor(url, auth) {
        super(url, auth);
        /** @type {Object} */
        this.itemClass = Tagging;
    }
    /**
     * Fetch the tag associated to this tag-specific list of taggings from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Tag>} - JS Promise, resolves to a ``Tag`` object
     */
    getTag(timeout = 30000) {
        const linkRelation = 'tag';
        const resourceClass = Tag;
        return this._getResource(linkRelation, resourceClass, null, timeout);
    }
    /**
     * Make a POST request to this tag-specific tagging list resource to create a new
     * tagging item resource through the REST API.
     *
     * @param {Object} data - request JSON data object
     * @param {string} data.feed_id - id of the feed to be tagged
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<this>} - JS Promise, resolves to ``this`` object
     */
    post(data, timeout = 30000) {
        return this._post(data, null, timeout);
    }
}
exports.TagTaggingList = TagTaggingList;
/**
 * Feed-specific tagging list resource object representing a list of taggings applied to
 * an specific feed.
 */
class FeedTaggingList extends resource_1.ListResource {
    /**
     * Constructor
     *
     * @param {string} url - url of the resource
     * @param {Object} auth - authentication object
     * @param {string} auth.token - authentication token
     */
    constructor(url, auth) {
        super(url, auth);
        /** @type {Object} */
        this.itemClass = Tagging;
    }
    /**
     * Fetch the feed associated to this feed-specific list of taggings from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Feed>} - JS Promise, resolves to a ``Feed`` object
     */
    getFeed(timeout = 30000) {
        const linkRelation = 'feed';
        const resourceClass = feed_1.Feed;
        return this._getResource(linkRelation, resourceClass, null, timeout);
    }
    /**
     * Make a POST request to this feed-specific tagging list resource to create a new
     * tagging item resource through the REST API.
     *
     * @param {Object} data - request JSON data object
     * @param {string} data.tag_id - id of the tag to be used to tag the feed
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<this>} - JS Promise, resolves to ``this`` object
     */
    post(data, timeout = 30000) {
        return this._post(data, null, timeout);
    }
}
exports.FeedTaggingList = FeedTaggingList;
/**
 * Tag-specific feed list resource object representing a list of feeds that are tagged
 * with an specific tag.
 */
class TagFeedList extends resource_1.ListResource {
    /**
     * Constructor
     *
     * @param {string} url - url of the resource
     * @param {Object} auth - authentication object
     * @param {string} auth.token - authentication token
     */
    constructor(url, auth) {
        super(url, auth);
        /** @type {Object} */
        this.itemClass = feed_1.Feed;
    }
    /**
     * Fetch the tag associated to this tag-specific list of feeds from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Tag>} - JS Promise, resolves to a ``Tag`` object
     */
    getTag(timeout = 30000) {
        const linkRelation = 'tag';
        const resourceClass = Tag;
        return this._getResource(linkRelation, resourceClass, null, timeout);
    }
}
exports.TagFeedList = TagFeedList;
/**
 * Feed-specific tag list resource object representing a list of tags that an specific
 * feed is tagged with.
 */
class FeedTagList extends resource_1.ListResource {
    /**
     * Constructor
     *
     * @param {string} url - url of the resource
     * @param {Object} auth - authentication object
     * @param {string} auth.token - authentication token
     */
    constructor(url, auth) {
        super(url, auth);
        /** @type {Object} */
        this.itemClass = Tag;
    }
    /**
     * Fetch the feed associated to this feed-specific list of tags from the REST API.
     *
     * @param {number} [timeout=30000] - request timeout
     *
     * @return {Promise<Feed>} - JS Promise, resolves to a ``Feed`` object
     */
    getFeed(timeout = 30000) {
        const linkRelation = 'feed';
        const resourceClass = feed_1.Feed;
        return this._getResource(linkRelation, resourceClass, null, timeout);
    }
}
exports.FeedTagList = FeedTagList;
