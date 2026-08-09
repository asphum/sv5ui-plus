export const quickExample = `<script lang="ts">
    import { Search } from 'svelora'

    const groups = [
        {
            id: 'suggestions',
            label: 'Suggestions',
            items: [
                { value: 'calendar', label: 'Calendar', icon: 'lucide:calendar' },
                { value: 'search-emoji', label: 'Search Emoji', icon: 'lucide:smile' },
                { value: 'calculator', label: 'Calculator', icon: 'lucide:calculator' }
            ]
        }
    ]
</script>

<Search 
    variant="modal" 
    {groups} 
    kbd={['meta', 'K']} 
    placeholder="Search..." 
/>`
