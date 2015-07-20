'use strict';

class Parent {
  static create () {
    return new Parent();
  }

  constructor () {

  }

  tick (entities) {
    entities.forEach((entity) => {
      if(!entity.hasComponents('parent', 'position')) {
        return;
      }

      var {parentId} = entity.getComponent('parent');
      var position = entity.getComponent('position');
      var parentPosition;

      // [TODO] This will need to be faster and/or cached
      entities.forEach((maybeParent) => {
        if(maybeParent.id === parentId) {
          parentPosition = maybeParent.getComponent('position');
        }
      });

      position.x = parentPosition.x;
      position.y = parentPosition.y;
      position.a = parentPosition.a;
    });
  }
}

module.exports = Parent;
