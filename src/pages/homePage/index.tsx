import { NavBar, Space, Button, List, Avatar, Image } from 'antd-mobile';
import { useHistory } from 'umi';
import getRecord from '@/assets/getRecord.png';
import hope from '@/assets/hope.png';
import tip from '@/assets/tip.png';
import edit from '@/assets/edit.png';
import get from '@/assets/get.png';
import rest from '@/rest';

import './index.less';
import { RightOutline } from 'antd-mobile-icons';
import { useEffect, useState } from 'react';
import type { Tool } from '@/types/tool';
export default () => {
  const history = useHistory();
  const [tools, setTools] = useState<Tool[]>([]);
  useEffect(() => {
    rest('/managers/office/inventory/records').then((res) => {
      if (res.data?.inventories?.length) {
        setTools(res.data?.inventories);
      }
    });
  }, []);
  const back = () => {
    history.goBack();
  };

  return (
    <div className="home-content">
      <NavBar className="home-nav" onBack={back}>
        办公用品领取
      </NavBar>
      <div className="home-container">
        <div className="home-top">
          <div className="home-top-user">
            <div className="home-top-user">
              <Avatar src="" style={{ '--size': '38px' }} />
              <text className="home-top-text">张地瓜</text>
            </div>
            <div className="home-top-user">
              <Button
                shape="rounded"
                onClick={() => {
                  history.push('/history-page');
                }}
              >
                <div style={{ display: 'flex' }}>
                  <img src={getRecord} className="home-icon" />

                  <div className="home-top-user-text">领取记录</div>
                </div>
              </Button>

              <Button
                shape="rounded"
                onClick={() => {
                  history.push('/wishes-page');
                }}
                className="left-icon"
              >
                <div style={{ display: 'flex' }}>
                  <img src={hope} className="home-icon" />
                  <div className="home-top-user-text">愿望池</div>
                </div>
              </Button>
            </div>
          </div>

          <div className="home-top-tip">
            <img src={tip} className="home-icon" />
            2022-11-09 近日上新：彩色笔上新，限量500份，先到先得！！
          </div>
        </div>

        <Space className="home-tools">
          <span className="home-tools-text">{`办公用品 (${tools.length})`}</span>
          <div
            className="home-tools-needs"
            onClick={() => {
              history.push('/needs-page');
            }}
          >
            <img src={edit} className="home-tools-edit" />
            <div className="home-tools-edit-box">
              <div className="home-tools-edit-right">
                <span className="home-tools-edit-text"> 提需求</span>
                <RightOutline fontSize={12} color="#007E4E" />
              </div>
            </div>
          </div>
        </Space>
        <List className="home-tools-list">
          {tools.map((tool) =>
            tool.real_stock < tool.stock ? (
              <List.Item
                key={tool.name}
                prefix={
                  <Image
                    src={tool.image}
                    style={{ borderRadius: 4 }}
                    fit="cover"
                    width={58}
                    height={58}
                  />
                }
                description={`库存: ${tool.real_stock}/${tool.stock}`}
                extra="领取"
                clickable
                onClick={() => {
                  history.push('/application-page', { tools, ...tool });
                }}
                className="home-tools-item"
              >
                {tool.name}
              </List.Item>
            ) : (
              <List.Item
                key={tool.name}
                prefix={
                  <Image
                    src={tool.image}
                    style={{ borderRadius: 4 }}
                    fit="cover"
                    width={58}
                    height={58}
                  />
                }
                description={`库存: ${tool.real_stock}/${tool.stock}`}
                arrow={
                  <Image
                    src={get}
                    fit="cover"
                    width={70}
                    height={70}
                    className="home-tools-item-have-get"
                  />
                }
                className="home-tools-item"
              >
                {tool.name}
              </List.Item>
            ),
          )}
          <div className="home-tools-no-list">没有更多了…</div>
        </List>
      </div>
    </div>
  );
};
