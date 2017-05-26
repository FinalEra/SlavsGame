class Enemy {

    public x:number;
    public y:number;
    public z:number;
    public character:Character;
    

    constructor(game: Game) {
        let mesh = game.characters['player'].clone();
        let skeleton = game.characters['player'].skeleton.clone();
        let material = game.characters['player'].material.clone();
        let mainMesh = BABYLON.MeshBuilder.CreateBox('enemy', { width: 0.5, size: 0.7}, game.scene);

        mesh.visibility = true;
        mesh.skeleton = skeleton;
        mesh.material = material;
        mesh.parent = mainMesh;
        mesh.position = new BABYLON.Vector3(0, -0.4, -0.3);

        mainMesh.position = new BABYLON.Vector3(Game.randomNumber(3,-10), 1.1, Game.randomNumber(-10,-16));
        mainMesh.visibility = false;
        mainMesh.physicsImpostor = new BABYLON.PhysicsImpostor(mainMesh, BABYLON.PhysicsImpostor.BoxImpostor, { mass:1, friction:0.01, restitution:0.2}, game.scene);

        game.sceneManager.shadowGenerator.getShadowMap().renderList.push(mesh);

        this.character = new Character(mainMesh, name, game);

        game.enemies.push(this);
        let self = this;
        game.scene.registerAfterRender(function() {
            if(game.player) {
                self.character.mesh.lookAt(game.player.character.mesh.position);
            }
        });
    }
}