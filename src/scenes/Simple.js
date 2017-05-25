/// <reference path="/babylon/babylon.2.5.d.ts"/>
/// <reference path="Scene.ts"/>
/// <reference path="/src/game.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Simple = (function (_super) {
    __extends(Simple, _super);
    function Simple(game, name) {
        _super.call(this, game, name);
        var self = this;
        game.sceneManager = this;
        BABYLON.SceneLoader.Load("", "assets/map/mapkaiso_lowpoly.babylon", game.engine, function (scene) {
            game.scene = scene;
            var assetsManager = new BABYLON.AssetsManager(scene);
            scene.executeWhenReady(function () {
                // scene.debugLayer.show();
                scene.lights = scene.lights.slice(2);
                this.light = scene.lights[0];
                this.light.intensity = 2;
                self.setShadowGenerator(this.light);
                self.setCamera();
                // self.createGameGUI();
                var gravityVector = new BABYLON.Vector3(0, -9.81, 0);
                var physicsPlugin = new BABYLON.CannonJSPlugin();
                scene.enablePhysics(gravityVector, physicsPlugin);
                new Items(assetsManager, game);
                new Characters(assetsManager, game);
                new Environment(game);
                assetsManager.load();
                var enemy = null;
                assetsManager.onFinish = function () {
                    enemy = new Enemy(game);
                    game.client.connect('127.0.0.1:3003');
                    window.addEventListener("keydown", function (event) {
                        game.controller.handleKeyUp(event);
                    });
                    window.addEventListener("keyup", function (event) {
                        game.controller.handleKeyDown(event);
                    }, false);
                };
                game.engine.runRenderLoop(function () {
                    scene.render();
                    if (game.player && enemy) {
                        enemy.character.mesh.lookAt(game.player.character.mesh.position);
                    }
                    //
                    // if(game.guiElements.hpBarEnemy.getValue() <= 0) {
                    //     game.guiElements.hpBarEnemy.updateValue(100);
                    // }
                });
            });
        });
    }
    return Simple;
}(Scene));
//# sourceMappingURL=Simple.js.map