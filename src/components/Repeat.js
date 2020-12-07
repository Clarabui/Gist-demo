const Repeat = ({items, renderedItem}) => {
  return (
    <>
      { items.map(item => renderedItem(item)) }
    </>
  )
}

export default Repeat