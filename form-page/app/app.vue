<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const emailError = ref('')

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const sendEmail = async (data: { name?: string; email: string; message?: string }) => {
  if (!data || !data.email) throw new Error('Missing email in data')

  const subject = encodeURIComponent('6weeks - Форма заповнена')
  const bodyText = [
    `Ім’я: ${data.name || '(не вказано)'}`,
    `Email: ${data.email}`,
    `Повідомлення: ${data.message || '(не вказано)'}`
  ].join('\n')
  const body = encodeURIComponent(bodyText)
  const to = 'vetkor97@gmail.com'
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`

  return Promise.resolve({ ok: true })
}

const onFormSubmit = async () => {
  emailError.value = ''

  const email = form.email ? String(form.email).trim() : ''

  if (!email) {
    emailError.value = 'Email обов’язкове поле.'
    toast.add({ severity: 'error', summary: 'Форма містить помилки', detail: emailError.value, life: 3000 })
    return
  }

  if (!emailRegex.test(email)) {
    emailError.value = 'Невірний формат Email.'
    toast.add({ severity: 'error', summary: 'Невірний формат Email', detail: emailError.value, life: 3000 })
    return
  }

  try {
    const sendData = { name: form.name, email, message: form.message }
    await sendEmail(sendData)
    toast.add({ severity: 'success', summary: 'Форма відправлена', detail: 'Лист надіслано', life: 4000 })

    form.name = ''
    form.email = ''
    form.message = ''
  } catch (e) {
    toast.add({ severity: 'error', summary: 'Помилка відправки', detail: String(e), life: 4000 })
  }
}
</script>

<template>
  <div class="page-dark">
    <div class="form-wrapper">
      <h1 class="title">Тестова відправка листа</h1>

      <Toast />

      <form @submit.prevent="onFormSubmit" class="form-card">
        <div class="field">
          <label class="label">Ім’я (необов’язкове)</label>
          <InputText v-model="form.name" name="name" type="text" placeholder="Ім’я" />
        </div>

        <div class="field">
          <label class="label required">Email *</label>
          <InputText v-model="form.email" name="email" type="email" placeholder="you@example.com" />
          <Message v-if="emailError" severity="error" size="small" variant="simple">
            {{ emailError }}
          </Message>
        </div>

        <div class="field">
          <label class="label">Текстове поле</label>
          <Textarea v-model="form.message" name="message" rows="5" placeholder="Повідомлення..." />
        </div>

        <div class="actions">
          <Button type="submit" severity="secondary" label="Відправити" />
        </div>
      </form>
    </div>
  </div>
</template>


<style scoped>
.page-dark {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f1724;
  color: #e6eef8;
  padding: 2rem;
  box-sizing: border-box;
}

.form-wrapper {
  width: 100%;
  max-width: 520px;
  background: #0b1220;
  border: 1px solid rgba(255,255,255,0.04);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 6px 18px rgba(2,6,23,0.6);
}

.title {
  margin: 0 0 1rem 0;
  font-size: 1.6rem;
  text-align: center;
  color: #ffffff;
}

.form-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.label {
  font-size: 0.9rem;
  color: #cbd5e1;
}

.label.required::after {
  content: " *";
  color: #f87171;
}

.actions {
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
}
</style>
