import { expect } from 'chai';
import Collection from './cj';
import { FeedList, Feed , FeedGroupPermission, FeedUserPermission } from './feed';
import Note from './note';
import { FeedTagList, FeedTaggingList, TagList } from './tag';
import { CommentList, Comment } from './comment';
import { AllPluginInstanceList, FeedPluginInstanceList } from './plugininstance';
import User from './user';
import { ComputeResourceList } from './computeresource';
import { PluginList } from './plugin';
import { UserFileList } from './userfile';
import { FileBrowserFolder } from './filebrowser';

// http://sinonjs.org/releases/v5.1.0/fake-xhr-and-server/

describe('Feed resources', () => {
  const username = 'cube';
  const password = 'cube1234';
  const chrisUrl = 'http://localhost:8000/api/v1/';
  const auth = { username: username, password: password };
  //const auth = {token: "d757da9c364fdc92368b90392559e0de78f54f02"};
  let feedListRes;

  before(() => {
    feedListRes = new FeedList(chrisUrl, auth);
    return feedListRes.get();
  });

  describe('Feed', () => {
    let feed;

    beforeEach(() => {
      const feedItemURl = feedListRes.collection.items[0].href;
      feed = new Feed(feedItemURl, auth);
      feed.collection = feedListRes.collection;
      feed = feed.clone();
    });

    it('can fetch the associated note from the REST API', done => {
      const result = feed.getNote();
      result
        .then(note => {
          expect(note).to.be.an.instanceof(Note);
          expect(note.isEmpty).to.be.false;
        })
        .then(done, done);
    });

    it('can fetch the associated folder from the REST API', done => {
      const result = feed.getFolder();
      result
        .then(folder => {
          expect(folder).to.be.an.instanceof(FileBrowserFolder);
          expect(folder.isEmpty).to.be.false;
        })
        .then(done, done);
    });

    it('can fetch the associated tags from the REST API', done => {
      const result = feed.getTags();
      result
        .then(tagList => {
          expect(tagList).to.be.an.instanceof(FeedTagList);
        })
        .then(done, done);
    });

    it('can fetch the associated taggings from the REST API', done => {
      const result = feed.getTaggings();
      result
        .then(taggingList => {
          expect(taggingList).to.be.an.instanceof(FeedTaggingList);
        })
        .then(done, done);
    });

    it('can fetch the associated comments from the REST API', done => {
      let comment;
      const commentsUrl = Collection.getLinkRelationUrls(feed.collection.items[0], 'comments');
      const commentList = new CommentList(commentsUrl[0], auth);
      const result = commentList
        .post({ title: 'Test Comment' })
        .then(listRes => {
          comment = listRes.getItems()[0];
        })
        .then(() => feed.getComments());
      result
        .then(commentList => {
          expect(commentList).to.be.an.instanceof(CommentList);
          expect(commentList.isEmpty).to.be.false;
        })
        .then(done, done);
    });

    it('can fetch a comment by id from the REST API', done => {
      let comment;
      const commentsUrl = Collection.getLinkRelationUrls(feed.collection.items[0], 'comments');
      const commentList = new CommentList(commentsUrl[0], auth);
      const result = commentList
        .post({ title: 'Test Comment' })
        .then(listRes => {
          comment = listRes.getItems()[0];
        })
        .then(() => feed.getComment(comment.data.id));
      result
        .then(comment => {
          expect(comment).to.be.an.instanceof(Comment);
          expect(comment.data.title).to.equal('Test Comment');
        })
        .then(done, done);
    });

    it('can fetch the associated plugin instances from the REST API', done => {
      const result = feed.getPluginInstances();
      result
        .then(plgInstList => {
          expect(plgInstList).to.be.an.instanceof(FeedPluginInstanceList);
          expect(plgInstList.isEmpty).to.be.false;
        })
        .then(done, done);
    });

    it('can become public through the REST API', done => {
      const result = feed.makePublic();
      result
        .then(feed => {
          expect(feed.data.public).to.be.true;
        })
        .then(done, done);
    });

    it('can become unpublic through the REST API', done => {
      const result = feed.makeUnpublic();
      result
        .then(feed => {
          expect(feed.data.public).to.be.false;
        })
        .then(done, done);
    }); 

    it('can grant a group permission through the REST API', done => {
      const result = feed.addGroupPermission('all_users');
      result
        .then(grp_permission => {
          expect(grp_permission).to.be.an.instanceof(FeedGroupPermission);
          expect(grp_permission.data.group_name).to.equal('all_users');
        })
        .then(done, done);
    });

    it('can grant a user permission through the REST API', done => {
      const result = feed.addUserPermission('chris');
      result
        .then(user_permission => {
          expect(user_permission).to.be.an.instanceof(FeedUserPermission);
          expect(user_permission.data.user_username).to.equal('chris');
        })
        .then(done, done);
    });  
  });

  describe('FeedList', () => {
    let feedList;

    beforeEach(() => {
      feedList = feedListRes.clone();
    });

    it('can fetch the authenticated user from the REST API', done => {
      const result = feedList.getUser();
      result
        .then(user => {
          expect(user).to.be.an.instanceof(User);
          expect(user.isEmpty).to.be.false;
        })
        .then(done, done);
    });

    it('can fetch the list of compute resources from the REST API', done => {
      const result = feedList.getComputeResources();
      result
        .then(computeResourceList => {
          expect(computeResourceList).to.be.an.instanceof(ComputeResourceList);
          expect(computeResourceList.isEmpty).to.be.false;
        })
        .then(done, done);
    });

    it('can fetch the list of fs plugins from the REST API', done => {
      const result = feedList.getPlugins({ type: 'fs' });
      result
        .then(pluginList => {
          expect(pluginList).to.be.an.instanceof(PluginList);
          expect(pluginList.isEmpty).to.be.false;
        })
        .then(done, done);
    });

    it('can fetch the list of plugin instances from the REST API', done => {
      const result = feedList.getPluginInstances({ id: 1 });
      result
        .then(plgInstanceList => {
          expect(plgInstanceList).to.be.an.instanceof(AllPluginInstanceList);
          expect(plgInstanceList.data).to.have.lengthOf.at.least(1);
        })
        .then(done, done);
    });

    it('can fetch the list of all tags from the REST API', done => {
      const result = feedList.getTags();
      result
        .then(allTagList => {
          expect(allTagList).to.be.an.instanceof(TagList);
        })
        .then(done, done);
    });

    it('can fetch the list of all user files from the REST API', done => {
      const result = feedList.getUserFiles();
      result
        .then(userFileList => {
          expect(userFileList).to.be.an.instanceof(UserFileList);
        })
        .then(done, done);
    });
  });
});
