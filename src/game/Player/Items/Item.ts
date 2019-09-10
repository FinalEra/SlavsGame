import {Game} from "../../game";

export class Item {
        public type: Number;
        public databaseId: Number;
        public mesh: BABYLON.Mesh;
        public meshName: string;
        public name: string;
        public image: string;
        public statistics: any;

        ///Trail Effect
        public trailBox: BABYLON.AbstractMesh;
        public trailMesh: BABYLON.TrailMesh;

        constructor(game: Game, itemData: any) {
            this.name = itemData.name;
            this.meshName = itemData.meshName;
            this.image = itemData.image;
            this.type = itemData.type;
            this.statistics = itemData.statistics;

            if (itemData.entity) {
                this.databaseId = itemData.entity.id;
            }
        }

        public dispose() {
            if (this.mesh) {
                this.mesh.dispose();
            }

            if (this.trailBox) {
                this.trailBox.dispose();
            }

            if (this.trailMesh) {
                this.trailMesh.dispose();
            }
        }

        public createTrailMesh(game: Game) {
            this.trailBox = BABYLON.Mesh.CreateBox('test', 1, game.getScene(), false);
            this.trailBox.visibility = 0;

            this.trailMesh = new BABYLON.TrailMesh("Test", this.trailBox, game.getScene(), 0.2, 40, false);
            this.trailMesh.visibility = 0;
            this.trailMesh.material = new BABYLON.StandardMaterial('trail_material', game.getScene());

            //TODO: emissibeColor for trail mesh
            // this.trailMesh.material.emissiveColor = BABYLON.Color3.White();
        }
    }
