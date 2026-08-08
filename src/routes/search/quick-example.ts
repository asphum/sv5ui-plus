export const quickExample = `<script lang="ts">
    import { Search } from 'svelora'

    const groups = [
        {
            id: 'suggestions',
            label: 'Suggestions',
            items: [
                { value: 'calendar', label: 'Calendar', icon: 'icon-[lucide--calendar]' },
                { value: 'search-emoji', label: 'Search Emoji', icon: 'icon-[lucide--smile]' },
                { value: 'calculator', label: 'Calculator', icon: 'icon-[lucide--calculator]' }
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
