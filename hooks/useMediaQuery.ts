import { useMediaQuery as uMd} from 'usehooks-ts';
const useMediaQuery = () => {
    const isMobile = uMd('(max-width: 767px)');
    const isTablet = uMd('(max-width: 1023px)');

    return {
        isMobile,
        isTablet
    }
}
export {useMediaQuery}