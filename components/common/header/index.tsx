import { HeaderDesktop } from '@/components/common/header/header-desktop';
import { HeaderMobile } from '@/components/common/header/header-mobile';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface HeaderProps {
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Header (props: HeaderProps) {

  return (
    <>
        <HeaderDesktop />
        <HeaderMobile />
    </>
  )
}
