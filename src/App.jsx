import { useState, useEffect } from "react";
import { AuthCard, Header, ItemCard, Modal, Wishlist } from "./components";
import { itemList } from "./data/itemList";
import './styles/App.css'

const App = () => {
  const [authenticated, setAuthenticated] = useState(localStorage.getItem('authenticated') || false);
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState(itemList);

  useEffect(() => {
    const localList = JSON.parse(localStorage.getItem('itemsList')) || itemList;

    if (localList != list) {
      const updatedList = list.map((item) => {
        const localItem = localList.find((localItem) => localItem.itemId === item.itemId);
        if (localItem) {
          if (localItem.status === 'requested' && item.status === 'listed') {
            return { ...item, status: 'requested' };
          } else if (localItem.status === 'requested' && item.status === 'borrowed') {
            return { ...item, status: 'borrowed' };
          }
        }
        return item;
      });
      console.log('list', list)
      console.log('local', localList)
      console.log('updated', updatedList)
      setList(updatedList)
    }
  }, [])

  const disableScroll = () => {
    document.body.style.overflow = 'hidden';
  }

  const enableScroll = () => {
    document.body.style.overflow = 'auto';
  }

  const openModal = (item) => {
    setModalOpened(true);
    setSelectedItem(item);
    disableScroll();
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalOpened(false);
    enableScroll()
  };


  return (
    <div className="app">
      {
        authenticated ? (
          <>
            <div className="app__header">
              <Header setSearchText={setSearchText} />
            </div>
            <div className="app__container">
              <div className="app__container__listings">
                {
                  list.map((item) => {
                    if (
                      item.itemName.toLowerCase().startsWith(searchText) ||
                      item.itemKeywords.some((keyword) => keyword.toLowerCase().startsWith(searchText))
                    )
                      return (
                        <ItemCard
                          key={item.itemId}
                          image={item.itemImage}
                          title={item.itemName}
                          description={item.itemDescription}
                          openModal={openModal}
                          item={item}
                          transactionState={item.transactionState}
                          status={item.status}
                        />
                      )
                  })
                }
              </div>
              <hr style={{ marginBlock: '1rem' }} />
              <div className="app__container__wishlist">
                <Wishlist />
              </div>
            </div>
          </>
        ) : (
          <AuthCard setAuthenticated={setAuthenticated} />
        )
      }
      {(modalOpened && selectedItem.status != 'borrowed') && (
        <Modal
          selectedItem={selectedItem}
          closeModal={closeModal}
          list={list}
          setList={setList}
          setSelectedItem={setSelectedItem}
        />
      )}
    </div>
  )
}

export default App;