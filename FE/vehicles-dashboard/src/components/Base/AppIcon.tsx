type IconName = 'shareNowCarIcon' | 'freeNowCarIcon' | 'logo' | 'happyFace' | 'sadFace';
type IconSize = 'sm' | 'md' | 'lg';
type AppIconProps = {
  name: IconName;
  size?: IconSize;
  classes?: string;
};

import Logo from './../../assets/icons/logo.svg';
import FreeNowCarIcon from './../../assets/icons/map/free-now-car.svg';
import ShareNowCarIcon from './../../assets/icons/map/share-now-car.svg';

import HappyIcon from './../../assets/icons/happy.svg';
import SadIcon from './../../assets/icons/sad.svg';

const iconsMap: Record<IconName, string> = {
  shareNowCarIcon: ShareNowCarIcon,
  freeNowCarIcon: FreeNowCarIcon,
  logo: Logo,
  happyFace: HappyIcon,
  sadFace: SadIcon,
};

const iconClasses: Record<IconSize, string> = {
  lg: 'size-10',
  md: 'size-4',
  sm: 'size-3',
};

const AppIcon: React.FC<AppIconProps> = ({ name, size, classes }) => {
  return (
    iconsMap[name] && (
      <img src={iconsMap[name]} className={`${classes} ${size ? iconClasses[size] : ''}`} />
    )
  );
};

export default AppIcon;
