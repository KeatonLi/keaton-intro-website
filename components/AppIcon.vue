<script setup lang="ts">
import { computed } from 'vue'
import { Activity, ArrowDown, ArrowLeft, ArrowLeftRight, ArrowRight, ArrowUpRight, Box, Building2, Calendar, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, CircleCheck, CircleX, Clock, Code, Copy, Download, Eye, FileText, GitBranch, Globe, History, House, Info, LayoutGrid, Lightbulb, Menu, Pencil, Quote, RefreshCw, RemoveFormatting, Search, Settings, Shrink, Star, Tag, Trash2, TriangleAlert, Upload, Waves, X } from '@lucide/vue'
const props = defineProps<{ name: string }>()
const icons = { 'arrow-down': ArrowDown, 'arrow-left': ArrowLeft, 'arrow-right': ArrowRight, 'arrow-up-right': ArrowUpRight, 'arrows-clockwise': RefreshCw, 'arrows-in-line-horizontal': Shrink, 'arrows-left-right': ArrowLeftRight, 'article': FileText, 'brackets-angle': Code, 'buildings': Building2, 'calendar-blank': Calendar, 'caret-down': ChevronDown, 'caret-left': ChevronLeft, 'caret-right': ChevronRight, 'caret-up': ChevronUp, 'check-circle': CircleCheck, 'clock-clockwise': Clock, 'clock-counter-clockwise': History, 'copy': Copy, 'cube-transparent': Box, 'download-simple': Download, 'eye': Eye, 'gear': Settings, 'git-branch': GitBranch, 'globe': Globe, 'house': House, 'info': Info, 'lightbulb': Lightbulb, 'list': Menu, 'magnifying-glass': Search, 'pencil-simple': Pencil, 'pulse': Activity, 'quotes': Quote, 'quotes-slash': RemoveFormatting, 'squares-four': LayoutGrid, 'star': Star, 'swap': ArrowLeftRight, 'tag': Tag, 'trash': Trash2, 'upload-simple': Upload, 'warning': TriangleAlert, 'wave-sine': Waves, 'x': X, 'x-circle': CircleX }
const lucide = computed(() => props.name.startsWith('ph:') ? icons[props.name.slice(3).replace(/-(bold|fill|regular|light|thin|duotone)$/, '') as keyof typeof icons] : undefined)
</script>
<template>
  <component v-if="lucide" :is="lucide" aria-hidden="true" :stroke-width="1.75" />
  <Icon v-else :name="name" />
</template>
