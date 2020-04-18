import React from 'react';
import { BookTwoTone, CheckSquareTwoTone, StarTwoTone } from '@ant-design/icons';
import miniLogo from '@/assets/mini-logo.png';

interface TypeIconProps {
  type: number;
}

export const getIcon = (type: number) => {
    switch(type){
      case 1:
        return <CheckSquareTwoTone style={{paddingRight: 6}} twoToneColor="#52c41a" />;
      case 2:
        return <span style={{paddingRight: 4}}><img src={miniLogo} style={{height: 16}}/></span>
      case 3:
        return <StarTwoTone style={{paddingRight: 6}} twoToneColor="#f50" />;
      case 4:
        return <BookTwoTone style={{paddingRight: 6}} />;
      default:
        return <CheckSquareTwoTone style={{paddingRight: 6}} twoToneColor="#52c41a" />;
    }
  }

const TypeIcon = ({type}: TypeIconProps) => (
    getIcon(type)
)

export default TypeIcon;
