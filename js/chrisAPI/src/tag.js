/** * Imports ***/
import { ItemResource, ListResource } from './resource';
import { FeedList, Feed } from './feed';

/**
 * Tag item resource object.
 */
export class Tag extends ItemResource {
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
   * @param {Object} [params=null] - page parameters
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to a ``TagFeedList`` object
   */
  getTaggedFeeds(params = null, timeout = 30000) {
    const linkRelation = 'feeds';
    const resourceClass = TagFeedList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }

  /**
   * Fetch a list of taggings made with this tag from the REST API.
   *
   * @param {Object} [params=null] - page parameters
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to a ``TaggingList`` object
   */
  getTaggings(params = null, timeout = 30000) {
    const linkRelation = 'taggings';
    const resourceClass = TagTaggingList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }
}

/**
 * Tag list resource object.
 */
export class TagList extends ListResource {
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
   * @param {Object} [params=null] - page parameters
   * @param {number} [params.limit] - page limit
   * @param {number} [params.offset] - page offset
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to a ``FeedList`` object
   */
  getFeeds(params = null, timeout = 30000) {
    const linkRelation = 'feeds';
    const resourceClass = FeedList;

    return this._getResource(linkRelation, resourceClass, params, timeout);
  }
}

/**
 * Tagging item resource object. A tagging of an specific feed with an specific tag.
 */
export class Tagging extends ItemResource {
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
   * @return {Object} - JS Promise, resolves to a ``Tag`` object
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
   * @return {Object} - JS Promise, resolves to a ``Feed`` object
   */
  getFeed(timeout = 30000) {
    const linkRelation = 'feed';
    const resourceClass = Feed;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }
}

/**
 * Tag-specific tagging list resource object. A list of taggings made with an specific
 * tag.
 */
export class TagTaggingList extends ListResource {
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
   * @return {Object} - JS Promise, resolves to a ``Tag`` object
   */
  getTag(timeout = 30000) {
    const linkRelation = 'tag';
    const resourceClass = Tag;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }
}

/**
 * Feed-specific tagging list resource object. A list of taggings applied to an specific
 * feed.
 */
export class FeedTaggingList extends ListResource {
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
   * @return {Object} - JS Promise, resolves to a ``Feed`` object
   */
  getFeed(timeout = 30000) {
    const linkRelation = 'feed';
    const resourceClass = Feed;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }
}

/**
 * Tag-specific feed list resource object. A list of feeds that are tagged with an
 * specific tag.
 */
export class TagFeedList extends ListResource {
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
    this.itemClass = Feed;
  }

  /**
   * Fetch the tag associated to this tag-specific list of feeds from the REST API.
   *
   * @param {number} [timeout=30000] - request timeout
   * @return {Object} - JS Promise, resolves to a ``Tag`` object
   */
  getTag(timeout = 30000) {
    const linkRelation = 'tag';
    const resourceClass = Tag;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }
}

/**
 * Feed-specific tag list resource object. A list of tags that an specific feed is tagged
 * with.
 */
export class FeedTagList extends ListResource {
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
   * @return {Object} - JS Promise, resolves to a ``Feed`` object
   */
  getFeed(timeout = 30000) {
    const linkRelation = 'feed';
    const resourceClass = Feed;

    return this._getResource(linkRelation, resourceClass, null, timeout);
  }
}
