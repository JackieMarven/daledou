import { _decorator, Component, Sprite, SpriteFrame, resources, Label } from 'cc';
const { ccclass, property } = _decorator;
import { BattleEngine } from './BattleEngine';

@ccclass('BattleUI')
export class BattleUI extends Component {
    @property(Sprite)
    playerPetSprite:Sprite = null;

    @property(Sprite)
    enemyPetSprite:Sprite = null;

    @property(BattleEngine)
    battleEngine:BattleEngine = null;

    start() {
        this.loadPetSprite(this.battleEngine.playerData.spritePath, this.playerPetSprite);
    }

    loadPetSprite(path:string, sprite:Sprite) {
        resources.load(path, SpriteFrame, (err, sf)=>{
            if(err) {
                console.error("图片加载失败", err);
                return;
            }
            sprite.spriteFrame = sf;
        })
    }

}
