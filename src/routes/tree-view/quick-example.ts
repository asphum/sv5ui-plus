export const quickExample = `<script lang="ts">
 import { TreeView } from 'svelora';

 const data = [
   {
     id: '1', label: 'src', icon: 'lucide:folder',
     children: [
       { id: '1-1', label: 'app.html', icon: 'lucide:file' }
     ]
   }
 ];
</script>

<TreeView items={data} />`
