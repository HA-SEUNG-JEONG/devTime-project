import { useState } from "react";
import HorizontalLogo from "./Icon/HorizontalLogo";
import avatar from "@/assets/avatar.png";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

import UserIcon from "./Icon/UserIcon";
import LogoutIcon from "./Icon/LogoutIcon";

const NavBar = () => {
  const [isLoggedIn, _] = useState(true);

  return (
    <nav className="flex items-center justify-between">
      <HorizontalLogo className="mr-4 cursor-pointer" />
      <div className="flex-1 flex items-center gap-4">
        <span className="typography-body-s text-secondary-indigo cursor-pointer hover:underline-offset-8 hover:underline">
          대시보드
        </span>
        <span className="typography-body-s text-secondary-indigo cursor-pointer hover:underline-offset-8 hover:underline">
          랭킹
        </span>
      </div>
      <div className="flex items-center gap-2">
        {isLoggedIn ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={avatar} />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border border-gray-300">
                <DropdownMenuItem>
                  <UserIcon size={20} className="text-gray-600" />
                  <span className="typography-body-s text-gray-600">
                    마이페이지
                  </span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="mx-3" />
                <DropdownMenuItem>
                  <LogoutIcon size={20} className="text-gray-600" />
                  <span className="typography-body-s text-gray-600">
                    로그아웃
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* TODO : username 표시 */}
            {/* {username} */}
            {/* <span>{username}</span> */}
          </>
        ) : (
          <>
            <span className="typography-body-s text-secondary-indigo">
              로그인
            </span>
            <span className="typography-body-s text-secondary-indigo">
              회원가입
            </span>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
