# RadioButtonGrid

A grid of radio buttons with labels attached. Only one can be selected.

## Usage example:

```typescript jsx
const speedOptions = [
    '2 Syllables',
    '3 Syllables',
    '4 Syllables',
]
const [selectedSpeedOptionsIndex, setselectedSpeedOptionsIndex] = useState(0)
```
    
```typescript jsx
<RadioButtonGrid
    items={vowelTypes}
    label={'Select a vowel type'}
    onSelect={newValue => {
        setSelectedVowelTypeIndex(newValue)
    }}
    selectedItemIndex={selectedVowelTypeIndex}
/>
```

## Output:

You could then use `selectedSpeedOptionsIndex`.

![Example of RadioButtonGrid](rbg_example.png)