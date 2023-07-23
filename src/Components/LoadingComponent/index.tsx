import React from 'react';
import { Spin } from 'antd';
import './LoadingComponent.scss'

const LoadingComponent: React.FC = () => <div className='loadingComponent'><Spin size='large' /></div>;

export default LoadingComponent;