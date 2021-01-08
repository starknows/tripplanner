import React from 'react'

function TBStarRating({ stars = 5, filled }) {
  const [value, setValue] = React.useState(filled)
  const [dynamicValue, setDynamicValue] = React.useState(filled)

  const handleClick = (newValue) => {
    setValue(newValue)
    setDynamicValue(newValue)
  }

  const handleMouseEnter = (newValue) => {
    setDynamicValue(newValue)
  }

  const handleMouseLeave = () => {
    setDynamicValue(value)
  }
  return (
    <>
      <div className="tb-star-rating-wrapper">
        <p>評分</p>
        <label>3.5</label>
        {[...Array(stars).keys()].map((i) => (
          <span
            key={i}
            onMouseEnter={() => handleMouseEnter(i + 1)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(i + 1)}
          >
            {dynamicValue >= i + 1 ? '★' : '☆'}
          </span>
        ))}
      </div>
    </>
  )
}
export default TBStarRating

// 拿 Ray 的來改