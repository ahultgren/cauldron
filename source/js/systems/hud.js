'use strict';

var R = require('ramda');
var filter = require('cauldron-core/app/utils/filter');

var hasHud = filter(entity => entity.hasComponents('hud'));
var typeHealth = entity => entity.getComponent('hud').type.indexOf('health') > -1;
var typeScore = entity => entity.getComponent('hud').type.indexOf('score') > -1;
var scoreDiff = (a, b) => b.getComponent('score').score - a.getComponent('score').score;

class Hud extends require('cauldron-core/app/systems/render') {
  static create (canvas) {
    return new Hud(canvas);
  }

  constructor (canvas) {
    super(canvas);
  }

  tick (entities) {
    var showable = hasHud(entities);
    var healthEntity = R.find(typeHealth, showable);

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if(healthEntity) {
      this.drawHealth(healthEntity);
    }

    showable.filter(typeScore)
    .sort(scoreDiff)
    .forEach((...args) => this.drawScore(...args));
  }

  drawHealth (entity) {
    var ctx = this.ctx;
    var {health, maxHealth} = entity.getComponent('health');
    var maxWidth = 300;
    var width = health / maxHealth * maxWidth;
    var height = 12;

    ctx.beginPath();
    ctx.fillStyle = '#0f0';
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.fillRect(20, 20, width, height);
    ctx.strokeRect(20, 20, maxWidth, height);
  }

  drawScore (entity, i) {
    var ctx = this.ctx;
    var {score} = entity.getComponent('score');
    var lineHeight = 24;
    var topOffset = 60;
    var left = 20;

    ctx.beginPath();
    ctx.fillStyle = '#f00';
    ctx.font = '16px monospace';
    ctx.fillText(`${entity.id.substring(0, 8)}: ${score}`, left, topOffset + lineHeight * i);
  }
}

module.exports = Hud;
