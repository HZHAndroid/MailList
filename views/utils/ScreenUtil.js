import {Dimensions, PixelRatio} from 'react-native'

const {width, height} = Dimensions.get('window');

const screenUtil = {
    // 单位像素
    pixel: 1 / PixelRatio.get(),
    // 屏幕尺寸
    size: {
        width: width,
        height: height
    }
};


export default screenUtil;