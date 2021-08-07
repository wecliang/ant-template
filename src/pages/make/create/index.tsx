import React from 'react';
import Header from './component/Header';
import Canvas from './component/Canvas';
import Content from './component/Content';
import Menu from './component/Menu';
import Setting from './component/Setting';

export default () => {

    return (
        <div style={{ margin:'-24px' }}>
            <Header />
            <div style={{ height:'calc(100vh - 36px)', display:'flex' }}>
                <Menu />
                <Canvas>
                    <Content />
                </Canvas>
                <Setting />
            </div>
        </div>
    )
}