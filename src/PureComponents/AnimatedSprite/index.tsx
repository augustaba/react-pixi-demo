import { CustomPIXIComponent, defaultApplyProps } from "@augustaba/react-pixi-fiber";


type AnimatedSpriteProps = {
  isPlaying?: boolean
  textures: PIXI.extras.AnimatedSprite["textures"];
  initialFrame?: number
}

const AnimatedSprite = CustomPIXIComponent<PIXI.extras.AnimatedSprite, AnimatedSpriteProps>(
  {
    customDisplayObject: (props) => new PIXI.extras.AnimatedSprite(props.textures, true),
    customApplyProps: function (instance, oldProps, newProps) {
      console.log('%c speed','color: red',instance.animationSpeed);
      console.log('props', oldProps, newProps)
      const  { textures, isPlaying, initialFrame, ...newResetProps  } = newProps
      const  { textures: oldTextures, isPlaying: oldPlaying, initialFrame: oldInitialFrame, ...oldResetProps  } = newProps
      if (isPlaying !== oldProps.isPlaying) {
        const frame = typeof initialFrame === 'number' ? initialFrame : instance.currentFrame || 0
        instance[isPlaying ? 'gotoAndPlay' : 'gotoAndStop'](frame)
      }
      // defaultApplyProps(instance, oldResetProps, newResetProps)
    },
    customDidAttach: instance => {
      // console.log(instance.textures);
      console.log('did')
    },
    customWillDetach: instance => {
      console.log('willDetach')
      // console.log(instance.textures);
    },
  },
  "AnimatedSprite"
);

export default AnimatedSprite