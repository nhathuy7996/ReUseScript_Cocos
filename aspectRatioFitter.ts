import { _decorator, Component, Node, UITransform, Enum, debug, Widget } from 'cc';
const { ccclass, property } = _decorator;


export enum FitType{
    None,
    WidthControlHeight,
    HeightControlWidth,
    FitInParent,
    EnvolParent
}

@ccclass('aspectRatioFitter')
export class aspectRatioFitter extends Component {

    UITransform: UITransform = null;
    @property
    aspect: number = 0;

    @property({type: Enum(FitType)})
    fitType: FitType = FitType.None;

    onLoad() {
        this.UITransform = this.getComponent(UITransform);
        if(this.fitType == FitType.None){
            this.aspect = this.UITransform.width / this.UITransform.height;
            return;
        }
    }

    update(deltaTime: number) { 
        this.calculateFit();
    }
 
    updateAspect(){
        this.aspect = this.UITransform.width / this.UITransform.height;

        this.calculateFit()
    }

    calculateFit(){
        if(this.UITransform == null){
            this.UITransform = this.getComponent(UITransform);
        }

        if(this.fitType == FitType.None){
            this.aspect = this.UITransform.width / this.UITransform.height;
            return;
        }

        if(this.fitType == FitType.HeightControlWidth){ 
            this.UITransform.width = this.UITransform.height*this.aspect;
            return;
        }
        
        if(this.fitType == FitType.WidthControlHeight){
            this.UITransform.height = this.UITransform.width/this.aspect;
            return;
        }

        if(this.fitType == FitType.FitInParent){
            let transformParent = this.node.parent.getComponent(UITransform);
            let tmpWidth = transformParent.height * this.aspect; // incase this.UITransform.height = transformParent.height;
            let tmpHeight = transformParent.width / this.aspect; // incase this.UITransform.width = transformParent.width;
 
            if(tmpWidth > transformParent.width){
                this.UITransform.width = transformParent.width;
                this.UITransform.height = tmpHeight;
 
                return; 
            }

            this.UITransform.height = transformParent.height;
            this.UITransform.width = tmpWidth;
            return;
        }

        if(this.fitType == FitType.EnvolParent){
            let transformParent = this.node.parent.getComponent(UITransform);
            let tmpWidth = transformParent.height * this.aspect; // incase this.UITransform.height = transformParent.height;
            let tmpHeight = transformParent.width / this.aspect; // incase this.UITransform.width = transformParent.width;
 
            if(tmpWidth > transformParent.width){
               
                this.UITransform.height = transformParent.height;
                this.UITransform.width = tmpWidth;
                return; 
            }
            this.UITransform.width = transformParent.width;
            this.UITransform.height = tmpHeight;

            return;
        }
    }

    
    resetInEditor (): void {
        if(this.UITransform == null){
            this.UITransform = this.getComponent(UITransform);
        }

        if(this.fitType == FitType.None){
            this.aspect = this.UITransform.width / this.UITransform.height;
            return;
        }
    }
    
    onFocusInEditor(){
        this.calculateFit();
    }
}

