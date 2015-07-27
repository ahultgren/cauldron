'use strict';

var R = require('ramda');
var filter = require('cauldron-core/app/utils/filter');

var hasHud = filter(entity => entity.hasComponents('hud'));
var typeHealth = entity => entity.getComponent('hud').type.indexOf('health') > -1;
var typeScore = entity => entity.getComponent('hud').type.indexOf('score') > -1;
var scoreDiff = (a, b) => b.getComponent('score').score - a.getComponent('score').score;
var zeroPad = (str) => ('0000' + str).substr(-2);
var zeroPadded = (strings, ...values) => R.flatten(R.zip(strings, values.map(zeroPad))).join('');

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
    this.timeleft();

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
    ctx.fillStyle = '#f00';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.fillRect(20, 20, width, height);
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
    ctx.textAlign = 'start';
    ctx.textBaseline = 'top';
    ctx.fillText(`${entity.id.substring(0, 8)}: ${score}`, left, topOffset + lineHeight * i);
  }

  timeleft () {
    var ctx = this.ctx;
    var now = new Date();
    var start = new Date(this.game.rules.started_at);
    var duration = this.game.rules.duration;
    var leftTime = new Date(start.valueOf() + duration * 1000 - now);

    ctx.beginPath();
    ctx.fillStyle = '#f00';
    ctx.font = '24px monospace';
    ctx.textAlign = 'end';
    ctx.textBaseline = 'top';
    ctx.fillText(
      zeroPadded`${leftTime.getMinutes()}:${leftTime.getSeconds()}`,
      this.canvas.width - 20,
      20
    );
  }
}

module.exports = Hud;
