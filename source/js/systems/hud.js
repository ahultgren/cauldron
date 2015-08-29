'use strict';

var R = require('ramda');
var filter = require('cauldron-core/app/utils/filter');
var Powerups = require('cauldron-core/app/systems/powerups/powerups');

const PADDING = 20;
const ICON_SIZE = 30;
const ICON_RADIUS = ICON_SIZE / 2;
const ICON_PADDING = 10;

var hasHud = filter(entity => entity.hasComponents('hud'));
var typeHealth = entity => entity.getComponent('hud').type.indexOf('health') > -1;
var typeScore = entity => entity.getComponent('hud').type.indexOf('score') > -1;
var typePowerup = entity => entity.getComponent('hud').type.indexOf('powerup') > -1;
var scoreDiff = (a, b) => b.getComponent('score').score - a.getComponent('score').score;
var zeroPad = (str) => ('0000' + str).substr(-2);
var zeroPadded = (strings, ...values) => R.flatten(R.zip(strings, values.map(zeroPad))).join('');

class Hud extends require('cauldron-core/app/systems/render') {
  static create (canvas) {
    return new Hud(canvas);
  }

  constructor (canvas) {
    super(canvas);
    this.camera = { x: 0, y: 0 };
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

    showable.filter(typePowerup)
    .forEach(entity => this.drawPowerups(entity));
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
    ctx.fillRect(PADDING, PADDING, width, height);
  }

  drawScore (entity, i) {
    var ctx = this.ctx;
    var {score} = entity.getComponent('score');
    var lineHeight = 24;
    var topOffset = 60;
    var left = PADDING;

    ctx.beginPath();
    ctx.fillStyle = '#f00';
    ctx.font = '16px monospace';
    ctx.textAlign = 'start';
    ctx.textBaseline = 'top';
    ctx.fillText(`${entity.id.substring(0, 8)}: ${score}`, left, topOffset + lineHeight * i);
  }

  drawPowerups (entity) {
    var {ctx} = this;
    var {powerups} = entity.getComponent('powerupTarget');

    powerups.forEach((powerup, i) => {
      this.transform(PADDING + ICON_RADIUS, 100 + (ICON_SIZE + ICON_PADDING) * i);
      this.draw(ctx, Powerups[powerup.type].icon);
      this.draw(ctx, {
        shape: 'arc',
        stroke: Powerups[powerup.type].icon.fill || '#fc0',
        radius: ICON_RADIUS,
        gap: (1 - powerup.duration / Powerups[powerup.type].duration) * Math.PI,
      });
      this.transform(0, 0, 0);
    });
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
